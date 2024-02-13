'use client';

import { css } from '@styled-system/css';
import TagItem from '@/components/tag/TagItem';
import Link from 'next/link';
import Card from '@/components/post/Card';
import { Post } from '@/lib/api/types';
import { safe } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { getPosts } from '@/lib/api/post';
import { useScrollPagination } from '@/lib/hooks/useScrollPagination';

const dummyTagList = [
  { id: 1, name: 'react' },
  { id: 2, name: 'node' },
  { id: 3, name: 'typescript' },
  { id: 4, name: 'C#' },
  { id: 5, name: 'nextjs' },
  { id: 6, name: 'devops' },
  { id: 7, name: 'aws' },
];

interface Props {
  posts: Post[];
}

function HomePosts({ posts }: Props) {
  const cursor = safe(() => (posts ? posts[posts.length - 1].id : null));
  const [data, setData] = useState<Post[]>(posts);

  const handleLoadMore = useCallback(
    async (cursor: number) => {
      const newPosts = await getPosts(cursor);
      if (newPosts && newPosts.payload.length === 0) return;
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
        <div className={empty}>작성한 글이 없네요!</div>
      </div>
    );
  }

  return (
    <>
      <div className={tagBox}>
        <ul
          className={css({
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 2,
            pl: 3,
            pr: 4,
            md: {
              width: '140px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              px: 0,
            },
          })}
        >
          {dummyTagList.map((tag) => (
            <li className={css({ maxWidth: '300px' })} key={tag.id}>
              <TagItem name={tag.name} />
            </li>
          ))}
        </ul>
      </div>
      <div className={postBox}>
        {data.map((post) => (
          <Link href={`/posts/${post.urlSlug}`} key={post.id}>
            <Card post={post} />
          </Link>
        ))}
      </div>
    </>
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

const tagBox = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
  bg: 'bg_page1',
  zIndex: 10,
  md: {
    height: 'auto',
    alignItems: 'self-start',
    position: 'sticky',
    top: '78px',
  },
});

const empty = css({
  py: '4rem',
  textAlign: 'center',
  fontSize: '1.5rem',
  color: 'text3',
});

export default HomePosts;
