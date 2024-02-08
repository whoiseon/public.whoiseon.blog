import { PostWriteParams } from '@/services/post.service';
import { ResponsePostWrite } from '@/lib/api/types';

export async function writePost(
  params: PostWriteParams,
): Promise<ResponsePostWrite> {
  const response = await fetch('http://localhost:3000/api/post', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await response.json();
}

export async function getPostById(postId: number) {
  try {
    const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
      method: 'GET',
    });

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getTempPosts(cursor?: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/post/temp${cursor ? `?cursor=${cursor}` : ''}`,
      {
        method: 'GET',
        cache: 'no-store',
        next: {
          tags: ['tempPost'],
        },
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
    const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
      method: 'DELETE',
      cache: 'no-store',
    });

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
