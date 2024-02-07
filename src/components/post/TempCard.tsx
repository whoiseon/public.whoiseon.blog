'use client';

import { Post } from '@/lib/api/types';
import Link from 'next/link';
import { css } from '@styled-system/css';
import { formatDate, removeImageMarkdown } from '@/lib/utils';
import Button from '@/components/system/Button';
import ModalButton from '@/components/system/ModalButton';
import { deletePost } from '@/lib/api/post';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { revalidatePath } from 'next/cache';

interface Props {
  post: Post;
  onDelete: (id: number) => void;
}

function TempCard({ post, onDelete }: Props) {
  const handleDeletePost = async () => {
    if (!post.id) return;
    const response = await deletePost(post.id);
    if (!response.error) {
      toast.success('임시 저장 글을 삭제했습니다.', {
        position: 'top-center',
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

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
        <ModalButton
          description="임시 저장한 글을 삭제하시겠습니까?"
          title="임시 저장 글 삭제"
          actionText="삭제"
          actionVariant="destructive"
          onClick={handleDeletePost}
        >
          <Button size="sm">삭제</Button>
        </ModalButton>
      </section>
    </div>
  );
}

export default TempCard;
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}
