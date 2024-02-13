import { getPostBySlug, getPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

type PageParams = {
  slug: string[];
};

interface Props {
  params: PageParams;
}

async function getPost(slug: string) {
  const response = await getPostBySlug(slug);
  return response.payload;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const response = (await getPosts({})) || { payload: [] };

  return response.payload.map((post: Post) => ({
    slug: post.urlSlug?.split('/'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  const title = post?.title;
  const description = post?.description;
  const url = post?.urlSlug && `https://imslow.me/posts/${post.urlSlug}`;
  const ogImage = post?.thumbnail ? post.thumbnail : '/opengraph-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, alt: post?.title }],
    },
  };
}

async function PostPage({ params }: Props) {
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  if (!post) {
    return notFound();
  }

  return <div>{post.title}</div>;
}

export default PostPage;
