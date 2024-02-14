import Link from 'next/link';
import { css } from '@styled-system/css';

interface Props {
  slug?: string;
  title?: string;
  type: 'prev' | 'next';
}

const quickPostLinkText = {
  prev: {
    text: '이전 포스트',
  },
  next: {
    text: '다음 포스트',
  },
};

function QuickPostLink({ slug, title, type }: Props) {
  const { text } = quickPostLinkText[type];

  return (
    <Link
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '4.5rem',
        transition: 'background-color 0.15s',
        _hover: {
          bg: 'bg_element1',
        },
        md: {},
      })}
      href={`/posts/${slug}`}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          px: '1rem',
        })}
      >
        <span
          className={css({
            fontSize: '0.75rem',
            color: 'text4',
          })}
        >
          {text}
        </span>
        <h3
          className={css({
            fontSize: '1.125rem',
            lineClamp: 1,
            fontWeight: 'semibold',
            width: '200px',
            maxWidth: '100%',
          })}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default QuickPostLink;
