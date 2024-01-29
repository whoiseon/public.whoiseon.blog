import { cva } from '@styled-system/css';
import Link from 'next/link';
import React from 'react';

const button = cva({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: 'full',
    transition: 'all 0.1s ease-in-out',
    cursor: 'pointer',
    minWidth: '24px',
    minHeight: '24px',
    color: 'text3',
    outline: 'none',
    _hover: {
      color: 'text1',
      bg: 'bg_element1',
    },
    _active: {
      color: 'text1',
      bg: 'bg_element2',
    },
  },
  variants: {
    variant: {
      default: {
        bg: 'bg_page1',
      },
      solid: {
        bg: 'bg_element1',
      },
      solidTag: {
        bg: 'bg_element1',
        _hover: {
          color: 'primary1',
        },
      },
      outline: {
        bg: 'bg_page1',
        border: '1px solid',
        borderColor: 'outline2',
      },
    },
    size: {
      sm: {
        px: '2.5',
        py: '1',
        fontSize: '0.875rem',
      },
      md: {
        px: '4',
        py: '2',
        fontSize: '1rem',
      },
      lg: {
        px: '6',
        py: '3',
        fontSize: '1.125rem',
      },
      icon_sm: {
        px: '1',
        py: '1',
      },
      icon_md: {
        px: '2',
        py: '2',
      },
      icon_lg: {
        px: '3',
        py: '3',
      },
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'solid' | 'solidTag' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon_sm' | 'icon_md' | 'icon_lg';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'default', size = 'md', href, ...rest }, ref) => {
    if (href) {
      return (
        <Link href={href} className={button({ variant, size })}>
          {children}
        </Link>
      );
    }

    return (
      <button className={button({ variant, size })} ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);

export default Button;
