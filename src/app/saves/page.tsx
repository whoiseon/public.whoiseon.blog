import { getTempPosts } from '@/lib/api/post';
import { Post, ResponsePosts } from '@/lib/api/types';
import dynamic from 'next/dynamic';

const TempCard = dynamic(() => import('@/components/post/TempCard'), {
  ssr: true,
});

async function getTempPostList(): Promise<Post[]> {
  const response = await getTempPosts();
  return response.payload;
}

async function TempSavesPage() {
  const posts = await getTempPostList();

  return (
    <div>
      <div>
        {posts.map((post) => (
          <TempCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default TempSavesPage;
