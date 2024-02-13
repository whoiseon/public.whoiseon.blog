import PostsTemplate from '@/components/home/PostsTemplate';
import { Post } from '@/lib/api/types';
import { getPosts } from '@/lib/api/post';
import HomePosts from '@/components/home/HomePosts';

async function getAllPosts(): Promise<Post[]> {
  const response = await getPosts();
  if (response) {
    return response.payload;
  }

  return [];
}

async function Home() {
  const posts = await getAllPosts();

  return (
    <PostsTemplate title="최신">
      <HomePosts posts={posts} />
    </PostsTemplate>
  );
}

export default Home;
