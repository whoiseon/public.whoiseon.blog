'use client';

import { css } from '@styled-system/css';
import Image from 'next/image';
import { useState } from 'react';
import { Post } from '@/lib/api/types';
import { formatDate } from '@/lib/utils';
import { MdBrokenImage } from '@react-icons/all-files/md/MdBrokenImage';

interface Props {
  post: Post;
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
            alt={title as string}
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
          <div
            className={`${emptyThumbnailStyle} ${cardHover ? thumbnailAnimation : ''}`}
          >
            <MdBrokenImage />
            <span>
              썸네일 이미지가
              <br />
              없습니다
            </span>
          </div>
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
            color: 'text5',
            fontWeight: 'normal',
          })}
        >
          {formatDate(createdAt as string)}
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
  maxHeight: '200px',
  objectFit: 'cover',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
});

const thumbnailAnimation = css({
  transform: 'translateY(-10px)',
  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)',
});

const emptyThumbnailStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  alignItems: 'center',
  textAlign: 'center',
  color: 'text6',
  fontSize: 'sm',
  fontWeight: 'bold',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  maxHeight: '200px',
  backgroundColor: 'bg_element1',
  transition: 'all 0.2s ease-in-out',
  '& svg': {
    fontSize: '3rem',
  },
  '& span': {
    lineHeight: '1.2',
  },
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
