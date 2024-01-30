'use client';

import { containerRaw } from '@/lib/styles/container';
import { css } from '@styled-system/css';
import Logo from '@/components/system/Logo';
import ThemeToggle from '@/components/system/ThemeToggle';
import Button from '@/components/system/Button';
import { useSession } from 'next-auth/react';

interface Props {
  isAdmin: boolean;
}

function Header({ isAdmin }: Props) {
  const { data: session } = useSession();

  return (
    <header className={block}>
      <div className={headerInner}>
        <Logo />
        <div className={navBlock}>
          <nav className={styledNav}>
            <ThemeToggle />
            {isAdmin && (
              <Button href="/auth/signin" size="sm">
                로그인
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

const block = css({
  position: 'sticky',
  top: 0,
  zIndex: 40,
  bg: 'bg_page1',
  backdropFilter: 'blur(3px)',
  width: '100%',
  borderBottom: '1px solid',
  borderColor: 'outline1',
});

const innerStyle = css.raw({
  display: 'flex',
  alignItems: 'center',
  height: '54px',
  px: 4,
  md: {
    height: '60px',
  },
});

const headerInner = css(innerStyle, containerRaw);

const navBlock = css({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const styledNav = css({
  display: 'flex',
  alignItems: 'center',
  mr: '-8px',
});

export default Header;
