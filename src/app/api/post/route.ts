import { NextRequest, NextResponse } from 'next/server';
import { PostService, PostWriteParams } from '@/services/post.service';

export async function POST(req: NextRequest, res: NextResponse) {
  const postService = new PostService();
  const body = (await req.json()) as PostWriteParams;

  return NextResponse.json(
    {
      ...(await postService.postWrite(body)),
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

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get('cursor');
  const postService = new PostService();
  const posts = await postService.getPosts({
    cursor: cursor ? Number(cursor) : undefined,
    isTemp: false,
  });

  return NextResponse.json(
    {
      ...posts,
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  );
}
