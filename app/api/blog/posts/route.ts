import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/app/api/lib/notion';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get('cursor');
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    const { posts, hasMore, nextCursor } = await getPosts({
      pageSize,
      startCursor: cursor || null,
    });

    return NextResponse.json({
      posts,
      hasMore,
      nextCursor,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
