import WritePageTemplate from '@/components/write/WritePageTemplate';

function Write({ searchParams }: { searchParams: { id: string } }) {
  return <WritePageTemplate postId={Number(searchParams?.id)} />;
}

export default Write;
