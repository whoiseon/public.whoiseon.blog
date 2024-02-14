'use client';

import { css } from '@styled-system/css';
import { TOCItem } from '@/lib/heading';
import { useHeadingViewEffect } from '@/lib/hooks/useHeadingViewEffect';
import useHeading from '@/lib/store/useHeading';

interface Props {
  item: TOCItem;
}

function PostNavItem({ item }: Props) {
  useHeadingViewEffect(item.id);
  const headingId = useHeading((state) => state.headingId);
  const isActive = headingId === item.id;

  return (
    <div
      key={item.id}
      className={css({
        paddingLeft:
          item.level === '1' ? '0' : item.level === '2' ? '0.75rem' : '1.5rem',
        transition: 'all 0.15s',
        scale: isActive ? 1.05 : 1,
      })}
    >
      <a
        href={item.link}
        className={css({
          fontSize: '0.875rem',
          color: isActive ? 'primary_right' : 'text4',
          fontWeight: 'light',
          transition: 'all 0.15s',
          _hover: {
            color: isActive ? 'primary_right' : 'text1',
          },
        })}
      >
        {item.text}
      </a>
    </div>
  );
}

export default PostNavItem;
