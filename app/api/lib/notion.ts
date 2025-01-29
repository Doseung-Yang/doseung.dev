import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getNotionPages() {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  console.log('📌 Notion API Response:', JSON.stringify(response.results, null, 2));

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.title?.title?.length > 0 ? page.properties.title.title[0]?.plain_text : '제목 없음',
    description:
      page.properties?.summary?.rich_text?.length > 0 ? page.properties.summary.rich_text[0]?.plain_text : '',
  }));
}
