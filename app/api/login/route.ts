import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin', 'true', { httpOnly: true });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
