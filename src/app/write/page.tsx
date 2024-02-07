import { css } from '@styled-system/css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const response = await fetch(`https://imslow.me/api/post/${postId}`, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!response.ok) throw new Error('Failed to fetch post');

  const { payload } = await response.json();

  return {
    id: payload.id,
    title: payload.title,
    tags: payload.tags.map((tag: Tag) => tag.name),
    body: payload.body,
    description: payload.description,
    isTemp: payload.isTemp,
    thumbnail: payload.thumbnail,
    urlSlug: payload.urlSlug,
  };
}

async function Write({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string };
}) {
  const post = await getPreparePost(Number(searchParams?.id));
  return (
    <PublishStoreProvider post={post}>
      <div className={block}>
        <EditorContainer />
        <ToastContainer />
      </div>
    </PublishStoreProvider>
  );
}

const block = css({
  w: '100dvw',
  h: '100dvh',
});

export default Write;
