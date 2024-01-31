'use client';

import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/system/DropdownMenu';
import Button from '@/components/system/Button';
import { Icons } from '@/components/system/Icons';
import { IoSunny, IoMoon } from 'react-icons/io5';

import { css } from '@styled-system/css';

interface Props {
  className?: string;
}

function ThemeToggle({ className }: Props) {
  const { setTheme } = useTheme();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon_md">
            <IoSunny
              className={css({
                width: '26px',
                height: '26px',
                rotate: '0deg',
                scale: '1',
                transition: 'all 0.25s ease-in-out',
                md: {
                  width: '24px',
                  height: '24px',
                },
                _dark: {
                  rotate: '-90deg',
                  scale: '0',
                },
              })}
            />
            <IoMoon
              className={css({
                position: 'absolute',
                width: '24px',
                height: '24px',
                rotate: '90deg',
                scale: '0',
                transition: 'all 0.25s ease-in-out',
                md: {
                  width: '24px',
                  height: '24px',
                },
                _dark: {
                  rotate: '0deg',
                  scale: '1',
                },
              })}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <span>Light</span>
            <IoSunny
              className={css({
                width: '22px',
                height: '22px',
              })}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <span>Dark</span>
            <IoMoon
              className={css({
                width: '22px',
                height: '22px',
              })}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggle;
