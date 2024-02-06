'use client';

import { Post } from '@/lib/api/types';
import Link from 'next/link';

interface Props {
  post: Post;
}

function TempCard({ post }: Props) {
  return (
    <div>
      <Link href={`/write?id=${post.id}`}>{post.title}</Link>
    </div>
  );
}

export default TempCard;
