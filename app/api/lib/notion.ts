import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { marked } from 'marked';
import { unstable_cache } from 'next/cache';

export type NotionPost = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  date?: string;
  published: boolean;
  coverUrl?: string;
  lastEditedTime?: string;
};

type NotionPageCover =
  | { type: 'external'; external: { url: string } }
  | { type: 'file'; file: { url: string } };

type NotionImageBlock = {
  id: string;
  image: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
    caption?: Array<{ plain_text: string }>;
  };
};

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
  created_time: string;
  last_edited_time?: string;
  cover?: NotionPageCover;
};

type NotionProperty =
  | { type: 'title'; title: Array<{ plain_text: string }> }
  | { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
  | { type: 'multi_select'; multi_select: Array<{ name: string }> }
  | { type: 'date'; date: { start: string } | null }
  | { type: 'checkbox'; checkbox: boolean };

type NotionSort = {
  timestamp: 'created_time' | 'last_edited_time';
  direction: 'ascending' | 'descending';
};

type NotionFilter = {
  property: string;
  rich_text: { equals: string };
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer('image', async (block) => {
  const { id, image } = block as NotionImageBlock;
  const url = image.type === 'external' ? image.external?.url : image.file?.url;
  if (!url) return '';
  const caption = image.caption?.[0]?.plain_text ?? '';
  return `![${caption}](https://www.notion.so/image/${encodeURIComponent(url)}?table=block&id=${id}&cache=v2)`;
});

function getProperty<T extends NotionProperty = NotionProperty>(
  page: NotionPage,
  name: string
): T | undefined {
  const property = page.properties[name];
  return property as T | undefined;
}

function getRichText(prop: NotionProperty | undefined): string | undefined {
  if (!prop) return undefined;
  
  if (prop.type === 'rich_text') {
    const arr = prop.rich_text;
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr.map(t => t.plain_text).join('').trim() || undefined;
  }
  
  if (prop.type === 'title') {
    const arr = prop.title;
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr.map(t => t.plain_text).join('').trim() || undefined;
  }
  
  return undefined;
}

function getMultiSelect(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== 'multi_select') return [];
  const arr = prop.multi_select;
  if (!Array.isArray(arr)) return [];
  return arr.map(t => t.name).filter(Boolean);
}

function mapPageToPost(page: NotionPage): NotionPost {
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
  
  let date: string | undefined = page.created_time;
  if (dateProp?.type === 'date' && dateProp.date?.start) {
    date = dateProp.date.start;
  }
  
  let published = false;
  if (pubProp?.type === 'checkbox') {
    published = pubProp.checkbox;
  }

  const lastEditedTime = page.last_edited_time ?? page.created_time;
  const coverUrl =
    page.cover?.type === 'external'
      ? page.cover.external.url
      : page.cover?.type === 'file'
        ? page.cover.file.url
        : undefined;

  return { id: page.id, title, slug, description, tags, date, published, coverUrl, lastEditedTime };
}

async function _getPosts(options?: { pageSize?: number; startCursor?: string | null }) {
  if (!NOTION_DATABASE_ID) throw new Error('NOTION_DATABASE_ID is not set');
  const { pageSize = 20, startCursor = null } = options || {};

  const sorts: NotionSort[] = [
    { timestamp: 'created_time', direction: 'descending' }
  ];

  const resp = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: undefined,
    sorts: sorts as never,
    page_size: pageSize,
    start_cursor: startCursor ?? undefined,
  });

  const posts = resp.results
    .filter((result) => typeof result === 'object' && result !== null && 'properties' in result)
    .map((page) => mapPageToPost(page as NotionPage));

  return { posts, hasMore: resp.has_more, nextCursor: resp.next_cursor };
}

async function _getPostBySlug(slug: string) {
  if (!NOTION_DATABASE_ID) throw new Error('NOTION_DATABASE_ID is not set');
  
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  if (isUuid) {
    try {
      const page = await notion.pages.retrieve({ page_id: slug });
      if (typeof page === 'object' && page !== null && 'properties' in page) {
        return mapPageToPost(page as NotionPage);
      }
    } catch {
    }
  }
  const slugPropertyNames = ['Slug', '슬러그'];
  
  for (const propertyName of slugPropertyNames) {
    try {
      const filter: NotionFilter = {
        property: propertyName,
        rich_text: { equals: slug },
      };
      
      const resp = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: filter as never,
        page_size: 1,
      });
      
      const result = resp.results[0];
      if (result && typeof result === 'object' && 'properties' in result) {
        return mapPageToPost(result as NotionPage);
      }
    } catch {
      continue;
    }
  }
  
  return null;
}

async function _getPostContentHtml(pageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks).parent ?? '';
  const html = marked.parse(mdString) as string;
  return { md: mdString, html };
}

export function getPostUrl(slug: string) {
  return `/blog/${slug}`;
}
export async function getPosts(options?: {
  pageSize?: number;
  startCursor?: string | null;
}) {
  const key = ['getPosts', process.env.NOTION_DATABASE_ID ?? 'no-db', JSON.stringify(options ?? {})];
  const cached = unstable_cache(() => _getPosts(options), key, {
    revalidate: 60,
    tags: ['notion-posts'],
  });
  return cached();
}

export async function getPostBySlug(slug: string) {
  const key = ['getPostBySlug', process.env.NOTION_DATABASE_ID ?? 'no-db', slug];
  const cached = unstable_cache(() => _getPostBySlug(slug), key, { revalidate: 300 });
  return cached();
}

export async function getPostContentHtml(pageId: string) {
  const key = ['getPostContentHtml', pageId];
  const cached = unstable_cache(() => _getPostContentHtml(pageId), key, { revalidate: 60 });
  return cached();
}
export async function getPostContentHtmlBySlug(slug: string) {
  const post = await getPostBySlug(slug);
  if (!post) return null;
  return getPostContentHtml(post.id);
}
