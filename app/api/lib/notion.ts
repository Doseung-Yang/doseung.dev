import { Client } from '@notionhq/client';
import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface NotionPage {
  id: string;
  title: string;
  description: string;
}

export async function getNotionPages(): Promise<NotionPage[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
  });

  console.log('📌 Notion API Response:', JSON.stringify(response.results, null, 2));

  return response.results
    .map(page => {
      if (!('properties' in page)) return null;
      const pageData = page as PageObjectResponse;

      return {
        id: page.id,
        title:
          pageData.properties?.title?.type === 'title' && pageData.properties.title.title.length > 0
            ? pageData.properties.title.title[0].plain_text
            : '제목 없음',
        description:
          pageData.properties?.summary?.type === 'rich_text' && pageData.properties.summary.rich_text.length > 0
            ? pageData.properties.summary.rich_text[0].plain_text
            : '',
      };
    })
    .filter(Boolean) as NotionPage[];
}
