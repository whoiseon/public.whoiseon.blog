'use client';

import { Post } from '@/lib/api/types';
import TempCard from '@/components/post/TempCard';
import { css } from '@styled-system/css';
import { useCallback, useEffect, useState } from 'react';
import { deletePost, getTempPosts } from '@/lib/api/post';
import { useToast } from '@/lib/hooks/useToast';
import { getScrollBottom, safe } from '@/lib/utils';
import { useScrollPagination } from '@/lib/hooks/useScrollPagination';

interface Props {
  posts: Post[];
}

function SavedPosts({ posts }: Props) {
  const { successToast } = useToast();
  const [data, setData] = useState<Post[]>(posts);

  const handleDeletePost = async (postId: number) => {
    if (!postId) return;
    const response = await deletePost(postId);
    if (!response.error) {
      successToast('임시 저장 글을 삭제했습니다.');
      setData((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  const cursor = safe(() => (data ? data[data.length - 1].id : null));

  const handleLoadMore = useCallback(
    async (cursor: number) => {
      const newPosts = await getTempPosts(cursor);
      if (newPosts && newPosts.payload.length === 0) return;
      console.log(newPosts.payload);
      setData((prev) => [...prev, ...newPosts.payload]);
    },
    [data],
  );

  useScrollPagination({
    cursor,
    onLoadMore: handleLoadMore,
  });

  useEffect(() => {
    setData(posts);
  }, [posts]);

  if (data.length === 0) {
    return (
      <div className={postBox}>
        <div className={empty}>임시 저장한 글이 없네요!</div>
      </div>
    );
  }

  return (
    <div className={postBox}>
      {data.map((post) => (
        <TempCard key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

const postBox = css({
  flex: 1,
  display: 'flex',
  flexDir: 'column',
  px: 4,
  gap: 10,
  md: {
    px: 0,
    gap: 16,
  },
});

const empty = css({
  py: '4rem',
  textAlign: 'center',
  fontSize: '1.5rem',
  color: 'text3',
});

export default SavedPosts;
