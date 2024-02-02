import { NextRequest, NextResponse } from 'next/server';
import getIsAdmin from '@/app/_actions/getIsAdmin';

export function middleware(req: NextRequest) {
  const { isAdmin } = getIsAdmin();

  if (isAdmin) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/', req.url));
}

export const config = {
  matcher: ['/api/:path*'],
};
