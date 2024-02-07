import { getTempPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import dynamic from 'next/dynamic';

const TempCard = dynamic(() => import('@/components/post/TempCard'), {
  ssr: true,
});

async function getTempPostList(): Promise<Post[]> {
  const response = await getTempPosts();
  if (response) {
    return response.payload;
  }

  return [];
}

async function TempSavesPage() {
  const posts = await getTempPostList();

  return (
    <div>
      {JSON.stringify(posts)}
      <div>
        {posts.map((post) => (
          <TempCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default TempSavesPage;
