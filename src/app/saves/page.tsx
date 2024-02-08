import { getTempPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import { css } from '@styled-system/css';
import PostsTemplate from '@/components/home/PostsTemplate';
import TempCard from '@/components/post/TempCard';
import { useUser } from '@/lib/store/modules/useUser';
import getUser from '@/app/_actions/getUser';
import { redirect } from 'next/navigation';
import { rewriteDefault } from '@vue/compiler-sfc';
import SavedPosts from '@/components/saves/SavedPosts';

async function getTempPostList(): Promise<Post[]> {
  const response = await getTempPosts();
  if (response) {
    return response.payload;
  }

  return [];
}

async function TempSavesPage() {
  const user = await getUser();
  if (!user) {
    redirect('/');
  }

  const posts = await getTempPostList();

  return (
    <PostsTemplate title="임시 글 목록">
      <SavedPosts posts={posts} />
    </PostsTemplate>
  );
}
export default TempSavesPage;
