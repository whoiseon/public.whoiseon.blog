import { useUser } from '@/lib/store/modules/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/system/DropdownMenu';
import Button from '@/components/system/Button';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { css } from '@styled-system/css';
import Link from 'next/link';

interface Props {
  className?: string;
}

function AuthDropdown({ className }: Props) {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon" size="icon_md">
          <Image
            src={user?.image || ''}
            alt={user?.email || ''}
            width={26}
            height={26}
            className={css({
              borderRadius: 'full',
            })}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={'/write'}
            className={css({
              width: '100%',
            })}
          >
            글쓰기
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={'/saves'}
            className={css({
              width: '100%',
            })}
          >
            임시 글
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={css({
            _hover: {
              bg: 'destructive1 !important',
              _light: {
                color: 'white',
              },
            },
          })}
          onClick={() => signOut()}
        >
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthDropdown;
