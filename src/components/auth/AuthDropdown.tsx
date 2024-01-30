import { useUser } from '@/lib/store/useUser';
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

interface Props {
  className?: string;
}

function AuthDropdown({ className }: Props) {
  const { user } = useUser();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon_md">
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
            <span>글쓰기</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={css({
              _hover: {
                bg: 'destructive1 !important',
              },
            })}
            onClick={() => signOut()}
          >
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AuthDropdown;
