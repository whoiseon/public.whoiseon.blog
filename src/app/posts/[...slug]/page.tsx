import { getPostBySlug, getPosts } from '@/lib/api/post';
import { Post } from '@/lib/api/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string[];
  };
}

async function getPost(slug: string) {
  const response = await getPostBySlug(slug);
  return response.payload;
}

export async function generateStaticParams() {
  const response = await getPosts({});
  return response.payload.map((post: Post) => ({
    slugs: post.urlSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  const title = post?.title;
  const description = post?.description;
  const url = post?.urlSlug && `https://imslow.me/posts/${post.urlSlug}`;
  const ogImage = post?.thumbnail ? post.thumbnail : '';

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

  return <div>post</div>;
}

export default PostPage;
