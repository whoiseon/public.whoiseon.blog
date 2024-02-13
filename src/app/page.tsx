import PostsTemplate from '@/components/home/PostsTemplate';
import { Post, Tag } from '@/lib/api/types';
import { getPosts } from '@/lib/api/post';
import HomePosts from '@/components/home/HomePosts';
import { getTags } from '@/lib/api/tag';

async function getAllPosts(tag: string): Promise<Post[]> {
  const response = await getPosts({
    tag,
  });
  if (response) {
    return response.payload;
  }

  return [];
}

async function getAllTags(): Promise<Tag[]> {
  const response = await getTags();
  if (response) {
    return response.payload;
  }

  return [];
}

interface Props {
  searchParams: {
    tag: string;
  };
}

async function Home({ searchParams }: Props) {
  const posts = await getAllPosts(searchParams.tag || '');
  const tags = await getAllTags();

  return (
    <PostsTemplate title="최신">
      <HomePosts posts={posts} tags={tags} />
    </PostsTemplate>
  );
}

export default Home;
