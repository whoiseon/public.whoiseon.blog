'use client';

import { Post } from '@/lib/api/types';
import Link from 'next/link';
import { css } from '@styled-system/css';
import { formatDate, removeImageMarkdown } from '@/lib/utils';
import Button from '@/components/system/Button';

interface Props {
  post: Post;
}

function TempCard({ post }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        py: '1.5rem',
        borderBottom: '1px solid',
        borderColor: 'outline1',
      })}
    >
      <h3
        className={css({
          fontSize: '1.25rem',
          mb: '1.5rem',
        })}
      >
        <Link href={`/write?id=${post.id}`}>{post.title}</Link>
      </h3>
      <p
        className={css({
          fontSize: '1rem',
          fontWeight: 'normal',
          color: 'text4',
          lineClamp: 2,
          lineHeight: '1.5',
          mb: '1rem',
          md: {
            lineClamp: 3,
          },
        })}
      >
        <Link href={`/write?id=${post.id}`}>
          {removeImageMarkdown(post.body || '')}
        </Link>
      </p>
      <section
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <span
          className={css({
            fontSize: '0.875rem',
            color: 'text5',
            fontWeight: 'normal',
          })}
        >
          {formatDate(post.createdAt as string)}
        </span>
        <Button size="sm">삭제</Button>
      </section>
    </div>
  );
}

export default TempCard;
