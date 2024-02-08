'use client';

import { Post } from '@/lib/api/types';
import TempCard from '@/components/post/TempCard';
import { css } from '@styled-system/css';
import { useState } from 'react';
import { deletePost } from '@/lib/api/post';
import { toast } from 'react-toastify';

interface Props {
  posts: Post[];
}

function SavedPosts({ posts }: Props) {
  const [postList, setPostList] = useState<Post[]>(posts);

  const handleDeletePost = async (postId: number) => {
    if (!postId) return;
    const response = await deletePost(postId);
    if (!response.error) {
      toast.success('임시 저장 글을 삭제했습니다.', {
        position: 'top-center',
        autoClose: 1500,
        pauseOnHover: false,
      });
      setPostList((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className={postBox}>
      {postList.map((post) => (
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

export default SavedPosts;
