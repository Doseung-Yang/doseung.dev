import { NextResponse } from 'next/server';
interface Comment {
  id: number;
  postId: number;
  content: string;
}

let comments: Comment[] = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const postComments = comments.filter(c => c.postId === parseInt(postId || '0', 10));
  return NextResponse.json(postComments);
}

export async function POST(req: Request) {
  const { postId, content } = await req.json();
  const newComment = { id: comments.length + 1, postId, content };
  comments.push(newComment);
  return NextResponse.json(newComment, { status: 201 });
}
