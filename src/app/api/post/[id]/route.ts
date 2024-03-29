import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const postService = new PostService();
  const postId = params.id;

  return NextResponse.json(
    {
      ...(await postService.getPostById(Number(postId))),
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const postService = new PostService();
  const postId = params.id;

  return NextResponse.json(
    {
      ...(await postService.postDelete(Number(postId))),
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  );
}
