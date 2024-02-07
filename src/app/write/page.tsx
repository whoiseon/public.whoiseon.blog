import { css } from '@styled-system/css';
import PublishStoreProvider from '@/components/write/PublishStoreProvider';
import { getPostById } from '@/lib/api/post';
import { Publish } from '@/lib/store/modules/usePublish';
import { Tag } from '@prisma/client';
import dynamic from 'next/dynamic';

const EditorContainer = dynamic(
  () => import('@/components/write/EditorContainer'),
  {
    ssr: true,
  },
);

async function getPreparePost(postId: number): Promise<Publish | null> {
  if (!postId) return null;
  const post = await getPostById(postId);

  if (!post.payload) return null;

  return {
    id: post.payload.id,
    title: post.payload.title,
    tags: post.payload.tags.map((tag: Tag) => tag.name),
    body: post.payload.body,
    description: post.payload.description,
    isTemp: post.payload.isTemp,
    thumbnail: post.payload.thumbnail,
    urlSlug: post.payload.urlSlug,
  };
}
async function Write({ searchParams }: { searchParams: { id: string } }) {
  const post = await getPreparePost(Number(searchParams?.id));
  return (
    <PublishStoreProvider post={post}>
      <div className={block}>
        <EditorContainer />
      </div>
    </PublishStoreProvider>
  );
}

const block = css({
  w: '100dvw',
  h: '100dvh',
});

export default Write;
