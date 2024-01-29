import { css } from '@styled-system/css';
import Image from 'next/image';

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

  return (
    <div className={block}>
      <div className={thumbnailBox}>
        {thumbnail ? (
          <Image
            className={thumbnailStyle}
            src={thumbnail}
            alt={title}
            width={250}
            height={150}
            placeholder="empty"
          />
        ) : (
          <div className={emptyThumbnailStyle} />
        )}
      </div>
      <div className={postInfoBox}></div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

const thumbnailBox = css({
  position: 'relative',
  flexShrink: 0,
  sm: {
    width: '200px',
    height: '150px',
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
  transition: 'all 0.2s ease-in-out',
});

const emptyThumbnailStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'bg_element1',
  border: '1px solid',
  borderColor: 'outline1',
  transition: 'all 0.2s ease-in-out',
});

const postInfoBox = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export default Card;
