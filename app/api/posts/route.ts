import { NextResponse } from 'next/server';
import { getPosts } from '@/app/api/lib/get-post';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}
