import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';

export async function GET(req: NextRequest, res: NextResponse) {
  const postService = new PostService();
  const tempPosts = await postService.getTempPosts();

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
        'Content-Type': 'application/json',
      },
    },
  );
}
