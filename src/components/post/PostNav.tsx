import { TOCItem } from '@/lib/heading';
import { css } from '@styled-system/css';
import PostNavItem from '@/components/post/PostNavItem';

interface Props {
  toc: TOCItem[];
}

function PostNav({ toc }: Props) {
  return (
    <nav
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      })}
    >
      {toc.map((item) => (
        <PostNavItem key={item.id} item={item} />
      ))}
    </nav>
  );
}

export default PostNav;
