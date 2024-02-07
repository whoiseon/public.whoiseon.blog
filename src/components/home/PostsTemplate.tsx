import { ReactNode } from 'react';
import { css } from '@styled-system/css';

interface Props {
  children: ReactNode;
  title: string;
  contentClassName?: string;
}

function PostsTemplate({ children, title, contentClassName }: Props) {
  return (
    <main className={block}>
      <h1 className={typography}>{title}</h1>
      <div className={`${contentBox} ${contentClassName}`}>{children}</div>
    </main>
  );
}

const block = css({
  mx: 'auto',
  maxWidth: '4xl',
  height: '100%',
});

const typography = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  lineHeight: 'tight',
  color: 'text1',
  my: 4,
  py: 4,
  px: 4,
  md: {
    fontSize: '3xl',
    mt: 14,
    mb: 8,
    px: 0,
  },
});

const contentBox = css({
  display: 'flex',
  flexDir: 'column',
  height: '100%',
  gap: 4,
  md: {
    gap: 8,
    flexDir: 'row-reverse',
    alignItems: 'flex-start',
  },
});

export default PostsTemplate;
