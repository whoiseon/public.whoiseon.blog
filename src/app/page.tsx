import styles from '@/app/page.module.css';

export default function Home() {
  return (
    <div className={styles.block}>
      <h1 className={styles.blogName}>기록은 나의 빛.</h1>
      <div className={styles.comment}>
        <p>주니어 프론트엔드 개발자의 문제 해결 과정에서 겪는 일들 그리고,</p>
        <p>성장하기 위한 다양한 몸부림을 준비중입니다!</p>
      </div>
    </div>
  )
}
