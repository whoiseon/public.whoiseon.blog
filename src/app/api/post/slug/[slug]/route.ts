import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const postService = new PostService();
  const slug = params.slug;
  const post = await postService.getPostBySlug(slug);

  return NextResponse.json(
    {
      ...post,
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
