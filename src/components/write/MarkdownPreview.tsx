'use client';

import { css } from '@styled-system/css';
import { useEffect, useRef } from 'react';

interface Props {
  preview: React.ReactNode;
  title: string;
  markdown: string | undefined;
}

function MarkdownPreview({ preview, title, markdown }: Props) {
  const Wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      Wrapper.current &&
      Wrapper.current.scrollHeight > Wrapper.current.clientHeight
    ) {
      const scrollHeight = Wrapper.current.scrollHeight;
      const clientHeight = Wrapper.current.clientHeight;
      Wrapper.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [markdown]);

  return (
    <div className={wrapper} ref={Wrapper}>
      <h1
        className={css({
          fontSize: '2.5rem',
          fontWeight: 700,
          mb: '4rem',
          color: 'text',
        })}
      >
        {title}
      </h1>
      {preview}
    </div>
  );
}

const wrapper = css({
  p: '2.5rem',
  flex: 1,
  overflowY: 'auto',
});

export default MarkdownPreview;
