import { css } from '@styled-system/css';
import WritePageTemplate from '@/components/write/WritePageTemplate';

function Write({ searchParams }: { searchParams: { id: string } }) {
  return <WritePageTemplate postId={Number(searchParams?.id)} />;
}

const block = css({
  w: '100dvw',
  h: '100dvh',
});

export default Write;
