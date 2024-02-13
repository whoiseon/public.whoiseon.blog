import { PostWriteParams } from '@/services/post.service';
import { ResponsePostWrite } from '@/lib/api/types';

export async function writePost(
  params: PostWriteParams,
): Promise<ResponsePostWrite> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/post`, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await response.json();
}

export async function getPostById(postId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/post/${postId}`,
      {
        method: 'GET',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/post/slug/${slug}`,
      {
        method: 'GET',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPosts({
  cursor,
  tag,
}: {
  cursor?: number;
  tag?: string;
}) {
  try {
    const params = new URLSearchParams({
      cursor: cursor?.toString() || '',
      tag: tag || '',
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/post?${params}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getTempPosts(cursor?: number) {
  try {
    const params = new URLSearchParams({
      cursor: cursor?.toString() || '',
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/post/temp?${params}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deletePost(postId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/post/${postId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
      },
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
