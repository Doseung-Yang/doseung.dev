import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const sent = (await req.text()).trim() || (await req.json().catch(() => null))?.secret;
  if (!secret || sent !== secret) return new Response('unauthorized', { status: 401 });

  revalidateTag('notion-posts');
  revalidatePath('/blog');

  return new Response('ok', { status: 200 });
}
