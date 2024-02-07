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
  try {
    const response = await fetch(`https://imslow.me/api/post/${postId}`, {
      method: 'GET',
    });

    const data = await response.json();

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getTempPosts() {
  try {
    const response = await fetch('https://imslow.me/api/post/temp', {
      method: 'GET',
    });

    const data = await response.json();

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
