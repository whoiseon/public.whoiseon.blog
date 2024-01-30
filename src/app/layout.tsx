import type { Metadata } from 'next';
import './globals.css';
import { css } from '@styled-system/css';
import Providers from '@/components/system/Providers';
import Header from '@/components/base/Header';
import { containerRaw } from '@/lib/styles/container';
import Footer from '@/components/base/Footer';
import getIsAdmin from '@/app/_actions/getIsAdmin';
import UserStoreProvider from '@/components/auth/UserStoreProvider';
import getUser from '@/app/_actions/getUser';

export const metadata: Metadata = {
  title: '기록은 나의 빛',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const { isAdmin } = getIsAdmin();

  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <body className={styledBody}>
        <Providers>
          <UserStoreProvider user={user}>
            <div className={rootBlock}>
              <Header isAdmin={isAdmin} />
              <div className={mainBlock}>{children}</div>
              <Footer />
            </div>
          </UserStoreProvider>
        </Providers>
      </body>
    </html>
  );
}

const styledBody = css({
  bg: 'bg_page1',
});

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
