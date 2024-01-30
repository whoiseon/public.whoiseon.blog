'use client';

import { signIn } from 'next-auth/react';
import Button from '@/components/system/Button';
import { css } from '@styled-system/css';

function AuthForm() {
  return (
    <div className={block}>
      <Button
        type="button"
        variant="outline"
        className={css({
          w: 'full',
          borderRadius: 0,
          fontWeight: 'bold',
        })}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        로그인
      </Button>
    </div>
  );
}

const block = css({
  display: 'flex',
  mx: 'auto',
  maxWidth: 'sm',
  pt: 4,
  px: 4,
  md: {
    pt: 12,
  },
});

export default AuthForm;
