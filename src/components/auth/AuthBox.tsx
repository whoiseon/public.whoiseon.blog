'use client';

import { signIn } from 'next-auth/react';
import Button from '@/components/system/Button';
import { css } from '@styled-system/css';
import { Icons } from '@/components/system/Icons';
import { useUser } from '@/lib/store/useUser';
import { redirect } from 'next/navigation';
import authRedirect from '@/lib/authRedirect';

function AuthBox() {
  authRedirect();

  return (
    <div className={block}>
      <Button
        type="button"
        variant="outline"
        className={css({
          w: 'full',
          borderRadius: 0,
          fontWeight: 'normal',
          gap: '0 0.5rem',
        })}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <Icons.Google className={css({ w: '26px', h: '26px' })} />
        구글 계정으로 로그인하기
      </Button>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  mx: 'auto',
  maxWidth: 'sm',
  pt: 4,
  px: 4,
  md: {
    pt: 12,
  },
});

export default AuthBox;
