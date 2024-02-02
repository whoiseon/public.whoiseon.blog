import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  // TODO: file upload logic in server
  console.log(req.body);
  return NextResponse.json({
    path: '123',
  });
}
