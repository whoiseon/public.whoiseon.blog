'use client';

import { Tag } from '@/lib/api/types';
import { css } from '@styled-system/css';
import { formatDate } from '@/lib/utils';
import TagItem from '@/components/tag/TagItem';
import { IoMdTime } from '@react-icons/all-files/io/IoMdTime';

interface Props {
  title?: string;
  tags?: Tag[];
  createdAt?: string;
}

function PostHead({ title, tags, createdAt }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        px: '1rem',
        md: {
          px: 0,
        },
      })}
    >
      <h1
        className={css({
          fontSize: '2rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          mb: '0.875rem',
          md: {
            mb: '1.5rem',
            fontSize: '2.5rem',
          },
        })}
      >
        {title}
      </h1>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          mb: '1rem',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          })}
        >
          <IoMdTime />
          <span
            className={css({
              color: 'text3',
              fontSize: 'sm',
            })}
          >
            {formatDate(createdAt as string)}
          </span>
        </div>
        <div>actionbox</div>
      </div>
      <div
        className={css({
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        })}
      >
        {tags?.map((tag: Tag) => <TagItem name={tag.name} key={tag.id} />)}
      </div>
    </div>
  );
}

export default PostHead;
