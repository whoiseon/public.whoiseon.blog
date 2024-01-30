import { useSearchParams } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthErrors, authErrors } from '@/lib/auth';
import Button from '@/components/system/Button';
import { css } from '@styled-system/css';
import Image from 'next/image';

interface Props {
  searchParams: {
    error: AuthErrors;
  };
}

function AuthError({ searchParams }: Props) {
  const errorMessage = authErrors[searchParams.error];

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        maxWidth: 'sm',
        pt: 4,
        px: 4,
        md: {
          pt: 12,
        },
      })}
    >
      <h3
        className={css({
          fontSize: '1rem',
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
          color: 'red.400',
        })}
      >
        {errorMessage}
      </h3>
      <Button href="/" variant="outline">
        돌아가기
      </Button>
    </div>
  );
}

export default AuthError;
