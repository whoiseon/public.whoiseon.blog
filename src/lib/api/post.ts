import { PostWriteParams } from '@/services/post.service';
import { ResponsePostWrite } from '@/lib/api/types';

export async function writePost(
  params: PostWriteParams,
): Promise<ResponsePostWrite> {
  const response = await fetch('https://imslow.me/api/post', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await response.json();
}

export async function getPostById(postId: number) {
  const response = await fetch(`https://imslow.me/api/post/${postId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  return await response.json();
}

export async function getTempPosts() {
  try {
    const response = await fetch('https://imslow.me/api/post/temp', {
      method: 'GET',
      cache: 'no-cache',
    });

    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
