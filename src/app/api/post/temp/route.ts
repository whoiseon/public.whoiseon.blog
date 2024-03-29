import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get('cursor');
  const postService = new PostService();
  const tempPosts = await postService.getPosts({
    cursor: cursor ? Number(cursor) : undefined,
    isTemp: true,
  });

  return NextResponse.json(
    {
      ...tempPosts,
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
