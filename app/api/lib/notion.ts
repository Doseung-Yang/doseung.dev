import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { marked } from 'marked';

export type NotionPost = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  date?: string;
  published: boolean;
  coverUrl?: string;
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

function getProperty<T = any>(page: any, name: string): T | undefined {
  return page?.properties?.[name];
}

function getRichText(prop: any): string | undefined {
  const arr = prop?.rich_text ?? prop?.title;
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return (
    arr
      .map((t: any) => t?.plain_text ?? '')
      .join('')
      .trim() || undefined
  );
}

function getMultiSelect(prop: any): string[] {
  const arr = prop?.multi_select;
  if (!Array.isArray(arr)) return [];
  return arr.map((t: any) => t?.name).filter(Boolean);
}

function mapPageToPost(page: any): NotionPost {
  const titleProp = getProperty(page, 'Title') ?? getProperty(page, '이름');
  const slugProp = getProperty(page, 'Slug') ?? getProperty(page, '슬러그');
  const descProp = getProperty(page, 'Description') ?? getProperty(page, '설명');
  const tagsProp = getProperty(page, 'Tags') ?? getProperty(page, '태그');
  const dateProp = getProperty(page, 'Date') ?? getProperty(page, '생성일');
  const pubProp = getProperty(page, 'Published') ?? getProperty(page, '공개');

  const title = getRichText(titleProp) ?? '(untitled)';
  const slug = getRichText(slugProp) ?? page.id;
  const description = getRichText(descProp);
  const tags = getMultiSelect(tagsProp);
  const date: string | undefined = dateProp?.date?.start ?? page?.created_time;
  const published: boolean = Boolean(pubProp?.checkbox);
  return { id: page.id, title, slug, description, tags, date, published, coverUrl: undefined };
}

export async function getPosts(options?: {
  pageSize?: number;
  startCursor?: string | null;
  includeUnpublished?: boolean;
}) {
  if (!NOTION_DATABASE_ID) throw new Error('NOTION_DATABASE_ID is not set');
  const { pageSize = 20, startCursor = null, includeUnpublished = false } = options || {};
  // 기본 블로그 목록 20개, 추후 인피니티 스크롤 구현 예정입니다.
  const filter = undefined;

  const resp = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }] as any,
    page_size: pageSize,
    start_cursor: startCursor ?? undefined,
  });

  const posts = resp.results.map(mapPageToPost);

  return { posts, hasMore: resp.has_more, nextCursor: resp.next_cursor };
}

export async function getPostBySlug(slug: string, options?: { includeUnpublished?: boolean }) {
  if (!NOTION_DATABASE_ID) throw new Error('NOTION_DATABASE_ID is not set');
  const { includeUnpublished = false } = options || {};
  // 최대 100개 포스터 가져오는 것으로 세팅, 추후 인피니티 스크롤로 대체 예정입니다.
  const { posts } = await getPosts({ pageSize: 100, includeUnpublished });
  const post = posts.find(p => p.slug === slug);

  if (!post) return null;

  const resp = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: { property: '이름', title: { contains: post.title } } as any,
    page_size: 1,
  });

  const page = resp.results[0];
  if (!page) return post;

  return mapPageToPost(page);
}

export async function getPostContentHtml(pageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks).parent ?? '';
  const html = marked.parse(mdString) as string;
  return { md: mdString, html };
}

export function getPostUrl(slug: string) {
  return `/blog/${slug}`;
}
