'use client';

import { Post } from '@/lib/api/types';
import Link from 'next/link';
import { css } from '@styled-system/css';

interface Props {
  post: Post;
}

function TempCard({ post }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <Link href={`/write?id=${post.id}`}>{post.title}</Link>
    </div>
  );
}

export default TempCard;
