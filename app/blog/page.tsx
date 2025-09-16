import { getPosts } from '@/app/api/lib/notion';
import BlogGallery from './_components/BlogGallery';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const { posts } = await getPosts({ pageSize: 20 });

  return (
    <section className="max-w-4xl mx-auto py-10 px-6 text-foreground">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">블로그</h1>
        <p className="text-xl text-muted-foreground">개발과 일상에 대한 이야기를 기록합니다</p>
      </div>

      <BlogGallery posts={posts} />

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">아직 작성된 글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
