import { css } from '@styled-system/css';
import TagItem from '@/components/tag/TagItem';
import Card, { TestPost } from '@/components/post/Card';
import Link from 'next/link';

const dummyTagList = [
  { id: 1, name: 'react' },
  { id: 2, name: 'node' },
  { id: 3, name: 'typescript' },
  { id: 4, name: 'C#' },
  { id: 5, name: 'nextjs' },
  { id: 6, name: 'devops' },
  { id: 7, name: 'aws' },
];

const dummyPostList: TestPost[] = [
  {
    postId: 1,
    title: '모노레포에 관하여',
    tags: [
      { id: 1, name: 'react' },
      { id: 5, name: 'nextjs' },
    ],
    description:
      '모노레포가 무엇인지? 모노레포를 왜 사용하는지에 대해서 알아보았습니다.',
    createdAt: '2024-01-09',
    thumbnail:
      'https://static.toss.im/assets/payments/contents/writer-2-thumb.jpg',
  },
  {
    postId: 2,
    title: 'React Server Components 이해하기 (by Josh.W.Comeau)',
    tags: [{ id: 1, name: 'react' }],
    description: 'Josh W Comeau님이 설명해주는 React Server Components',
    createdAt: '2024-01-09',
    thumbnail:
      'https://static.toss.im/assets/payments/contents/writer-thumb.jpg',
  },
  {
    postId: 3,
    title: 'React 18이 애플리케이션 성능을 향상시키는 방법',
    tags: [{ id: 1, name: 'react' }],
    description:
      'React 18 어떤 점이 애플리케이션 성능 향상에 도움이 될까요? Vercel 블로그 글을 옮기며 정리해보았습니다.',
    createdAt: '2024-01-09',
    thumbnail:
      'https://static.toss.im/assets/payments/contents/spring-thumb.jpg',
  },
  {
    postId: 4,
    title: 'Next generation(Next.js 13.4)',
    tags: [{ id: 5, name: 'nextjs' }],
    description:
      'Next.js 13.4 버전 릴리즈와 함께 드디어 App Router가 Stable로 전환되었습니다. Next 13.4 업데이트 기능을 살펴보았습니다.',
    createdAt: '2024-01-09',
    thumbnail:
      'https://static.toss.im/assets/payments/contents/payments-train-thumb.jpg',
  },
];

function Home() {
  return (
    <main className={block}>
      <h1 className={typography}>최신</h1>
      <div className={contentBox}>
        <ul className={tagBox}>
          {dummyTagList.map((tag) => (
            <TagItem key={tag.id} name={tag.name} />
          ))}
        </ul>
        <div className={postBox}>
          {dummyPostList.map((post) => (
            <Link href={`/posts/${post.title}`} key={post.postId}>
              <Card post={post} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const block = css({
  mx: 'auto',
  maxWidth: '4xl',
});

const typography = css({
  fontSize: 'xl',
  fontWeight: 'semibold',
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
  gap: 4,
  md: {
    flexDir: 'row-reverse',
  },
});

const postBox = css({
  flex: 1,
  display: 'flex',
  flexDir: 'column',
  px: 4,
  md: {
    px: 0,
  },
});

const tagBox = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 2,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
  pl: 3,
  pr: 4,
  md: {
    width: '140px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    px: 0,
  },
});

export default Home;
