import { ResponsePosts } from '@/lib/api/types';
import dynamic from 'next/dynamic';

const TempCard = dynamic(() => import('@/components/post/TempCard'), {
  ssr: true,
});

async function getTempPostList(): Promise<ResponsePosts> {
  const response = await fetch('https://imslow.me/api/post/temp', {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!response.ok) throw new Error('Failed to fetch temp posts');

  return (await response.json()) as ResponsePosts;
}

async function TempSavesPage() {
  const posts = await getTempPostList();

  return (
    <div>
      <div>
        {posts.payload.map((post) => (
          <TempCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default TempSavesPage;
