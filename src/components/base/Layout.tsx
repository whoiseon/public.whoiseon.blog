'use client';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import { css } from '@styled-system/css';
import { containerRaw } from '@/lib/styles/container';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  isAdmin: boolean;
}

function Layout({ children, isAdmin }: Props) {
  const pathname = usePathname();
  const isWritePage = pathname === '/write';

  if (isWritePage) {
    return <div className={rootBlock}>{children}</div>;
  }

  return (
    <div className={rootBlock}>
      <Header isAdmin={isAdmin} />
      <div className={mainBlock}>{children}</div>
      <Footer />
    </div>
  );
}

const rootBlock = css({
  display: 'flex',
  flexDir: 'column',
  minH: '100dvh',
});

const mainStyle = css.raw({
  flex: 1,
  width: '100%',
  mb: 20,
});

const mainBlock = css(mainStyle, containerRaw);

export default Layout;
