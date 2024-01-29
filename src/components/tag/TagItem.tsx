'use client';

import Link from 'next/link';
import Button from '@/components/system/Button';
import { css } from '@styled-system/css';

export interface TestTagItem {
  name: string;
}

function TagItem({ name }: TestTagItem) {
  return (
    <li className={css({ maxWidth: '300px' })}>
      <Button href={`/${name}`} variant="solidTag" size="sm">
        {name}
      </Button>
    </li>
  );
}

export default TagItem;
