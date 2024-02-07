import { ReactNode } from 'react';
import { Publish } from '@/lib/store/modules/usePublish';
import { getPostById } from '@/lib/api/post';
import { Tag } from '@prisma/client';
import PublishStoreProvider from '@/components/write/PublishStoreProvider';

interface Props {
  children: ReactNode;
  params: any;
  searchParams: {
    id: string;
  };
}

async function getPreparePost(postId: number): Promise<Publish | null> {
  if (!postId) return null;
  const post = await getPostById(postId);
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

async function WriteLayout({ children, params, searchParams }: Props) {
  const post = await getPreparePost(Number(searchParams?.id));
  return <PublishStoreProvider post={post}>{children}</PublishStoreProvider>;
}

export default WriteLayout;
