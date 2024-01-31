'use client';

import Link from 'next/link';
import Button from '@/components/system/Button';
import { css, cva } from '@styled-system/css';

export interface TestTagItem {
  name: string;
  isText?: boolean;
  onClick?: () => void;
  className?: string;
}

function TagItem({ name, isText, onClick, className = '' }: TestTagItem) {
  if (isText) {
    return (
      <div
        className={`${textTag} ${onClick && css({ cursor: 'pointer' })} ${className}`}
        onClick={onClick}
      >
        {name}
      </div>
    );
  }

  return (
    <Button
      className={className}
      href={`/${name}`}
      variant="solidTag"
      size="sm"
    >
      {name}
    </Button>
  );
}

const textTag = css({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'full',
  minWidth: '24px',
  minHeight: '24px',
  color: 'text3',
  outline: 'none',
  bg: 'bg_element1',
  px: '2.5',
  py: '1',
  fontSize: '0.875rem',
});

export default TagItem;
