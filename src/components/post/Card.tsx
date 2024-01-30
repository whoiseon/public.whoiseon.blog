'use client';

import { css } from '@styled-system/css';
import Image from 'next/image';
import { useState } from 'react';

export interface TestPost {
  postId: number;
  title: string;
  description: string;
  createdAt: string;
  tags: TestTag[];
  thumbnail: string;
}

export interface TestTag {
  id: number;
  name: string;
}

interface Props {
  post: TestPost;
}

function Card({ post }: Props) {
  const { title, description, createdAt, tags, thumbnail } = post;

  const [cardHover, setCardHover] = useState<boolean>(false);

  const onMouseCard = () => {
    setCardHover(true);
  };

  const onLeaveCard = () => {
    setCardHover(false);
  };

  return (
    <div
      className={block}
      onMouseEnter={onMouseCard}
      onMouseLeave={onLeaveCard}
    >
      <div className={thumbnailBox}>
        {thumbnail ? (
          <Image
            className={`${thumbnailStyle} ${cardHover ? thumbnailAnimation : ''}`}
            src={thumbnail}
            alt={title}
            width={250}
            height={165}
            placeholder="empty"
            decoding="async"
            loading="lazy"
            style={{
              color: 'transparent',
            }}
          />
        ) : (
          <div className={emptyThumbnailStyle} />
        )}
      </div>
      <div className={postInfoBox}>
        <h3
          className={`${css({
            fontSize: 'xl',
            fontWeight: 'semibold',
            lineHeight: '1.5',
            lineClamp: 2,
            transition: 'all 0.2s ease-in-out',
            sm: { fontSize: '2xl' },
          })} ${cardHover ? titleAnimation : ''}`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={css({
              lineHeight: '1.5rem',
              color: 'text4',
              mt: 1,
              lineClamp: 2,
              md: {
                lineClamp: 3,
                lineHeight: '1.5rem',
              },
            })}
          >
            {description}
          </p>
        )}
        <div
          className={css({
            minHeight: '1rem',
            flex: 1,
            sm: {
              minHeight: '0',
            },
          })}
        />
        <span
          className={css({
            fontSize: 'sm',
            color: 'text6',
            fontWeight: 'normal',
          })}
        >
          {createdAt}
        </span>
      </div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  sm: {
    flexDirection: 'row',
    gap: 8,
  },
});

const thumbnailBox = css({
  position: 'relative',
  flexShrink: 0,
  sm: {
    width: '220px',
    height: '165px',
  },
  md: {
    width: '250px',
    height: '200px',
  },
});

const thumbnailStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
});

const thumbnailAnimation = css({
  transform: 'translateY(-10px)',
  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)',
});

const emptyThumbnailStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'bg_element1',
  border: '1px solid',
  borderColor: 'outline1',
  transition: 'all 0.2s ease-in-out',
});

const titleAnimation = css({
  color: 'primary1',
});

const postInfoBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: '1',
});

export default Card;
