import { getTempPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import TempCard from '@/components/post/TempCard';

async function getTempPostList(): Promise<Post[]> {
  return getTempPosts();
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
