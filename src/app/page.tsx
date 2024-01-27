import { css } from '@styled-system/css';

function Home() {
  return (
    <div className={styled.block}>
      <h1 className={styled.blogTitle}>기록은 나의 빛</h1>
      <p className={styled.comment}>
        주니어 프론트엔드 개발자의 문제해결 과정을 기록하는 블로그입니다. <br />
        현재 블로그는 개발 중입니다.
      </p>
    </div>
  )
}

const styled = {
  block: css({
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDir: 'column',
    gap: '1rem'
  }),

  blogTitle: css({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'zinc.300',
  }),

  comment: css({
    fontSize: '1rem',
    color: 'zinc.400',
    textAlign: 'center',
  })
}

export default Home;
