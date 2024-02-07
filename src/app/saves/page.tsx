import { getTempPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import { css } from '@styled-system/css';
import PostsTemplate from '@/components/home/PostsTemplate';
import TempCard from '@/components/post/TempCard';
import { useUser } from '@/lib/store/modules/useUser';
import getUser from '@/app/_actions/getUser';
import { redirect } from 'next/navigation';
import { rewriteDefault } from '@vue/compiler-sfc';

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
      <div className={postBox}>
        {posts.map((post) => (
          <TempCard key={post.id} post={post} />
        ))}
      </div>
    </PostsTemplate>
  );
}

const postBox = css({
  flex: 1,
  display: 'flex',
  flexDir: 'column',
  px: 4,
  gap: 10,
  md: {
    px: 0,
    gap: 16,
  },
});

export default TempSavesPage;
