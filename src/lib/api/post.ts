import { PostWriteParams } from '@/services/post.service';
import { ResponsePostWrite } from '@/lib/api/types';

export async function writePost(
  params: PostWriteParams,
): Promise<ResponsePostWrite> {
  const response = await fetch('/api/post', {
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
  const response = await fetch('http://localhost:3000/api/post/temp', {
    method: 'GET',
    cache: 'no-store',
  });

  return await response.json();
}
