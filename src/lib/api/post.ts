import { PostWriteParams } from '@/services/post.service';
import { ResponsePostWrite } from '@/lib/api/types';

export async function postTempSave(
  params: PostWriteParams,
): Promise<ResponsePostWrite> {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await response.json();
}
