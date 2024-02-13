import { NextRequest, NextResponse } from 'next/server';
import { TagService } from '@/services/tag.service';

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get('cursor');
  const tagService = new TagService();
  const tags = await tagService.getTags();

  return NextResponse.json(
    {
      ...tags,
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
