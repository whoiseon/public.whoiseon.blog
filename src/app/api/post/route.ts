import { NextRequest, NextResponse } from 'next/server';
import { PostService, PostWriteParams } from '@/services/post.service';

export async function POST(req: NextRequest, res: NextResponse) {
  const postService = new PostService();
  const body = (await req.json()) as PostWriteParams;

  return NextResponse.json(
    {
      ...(await postService.postTempSave(body)),
    },
    {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  );
}
