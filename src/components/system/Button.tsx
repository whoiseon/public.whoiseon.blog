import { cva } from '@styled-system/css';
import Link from 'next/link';
import React from 'react';

const button = cva({
  base: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'sm',
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
    layout: {
      inline: {
        display: 'inline-flex',
      },
      fullWidth: {
        width: '100%',
      },
    },
    variant: {
      default: {
        bg: 'bg_page1',
      },
      primary: {
        bg: 'primary1',
        color: 'button_text1',
        _hover: {
          bg: 'primary2',
          color: 'button_text1',
        },
        _active: {
          bg: 'primary3',
          color: 'button_text1',
        },
      },
      destructive: {
        bg: 'destructive1',
        color: 'button_text1',
        _hover: {
          bg: 'destructive2',
          color: 'button_text1',
        },
        _active: {
          bg: 'destructive3',
          color: 'button_text1',
        },
      },
      solid: {
        bg: 'bg_element1',
      },
      solidTag: {
        borderRadius: 'full',
        bg: 'bg_element1',
        _hover: {
          color: 'primary1',
        },
      },
      icon: {
        borderRadius: 'full',
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

export type ButtonVariants =
  | 'default'
  | 'solid'
  | 'solidTag'
  | 'outline'
  | 'destructive'
  | 'primary'
  | 'icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  layout?: 'fullWidth' | 'inline';
  variant?: ButtonVariants;
  size?: 'sm' | 'md' | 'lg' | 'icon_sm' | 'icon_md' | 'icon_lg';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      layout = 'inline',
      size = 'md',
      href,
      className,
      ...rest
    },
    ref,
  ) => {
    if (href) {
      return (
        <Link
          href={href}
          className={`${button({ variant, size, layout })} ${className || ''}`}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={`${button({ variant, size, layout })} ${className || ''}`}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
