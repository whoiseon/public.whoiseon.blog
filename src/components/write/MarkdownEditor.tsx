'use client';

import { css } from '@styled-system/css';
import { ChangeEventType } from '@/lib/hooks/useInput';

interface Props {
  title: string;
  onChangeTitle: (e: ChangeEventType) => void;
  tagInput: React.ReactNode;
  footer: React.ReactNode;
  editor: React.ReactNode;
}

function MarkdownEditor(props: Props) {
  return (
    <div className={leftBlock}>
      <div className={wrapper}>
        <div className={writeHead}>
          <div
            className={css({
              px: '1rem',
              pt: '1rem',
              md: { px: '2.5rem', pt: '1.5rem' },
            })}
          >
            <input
              type="text"
              className={titleInput}
              placeholder="제목을 입력하세요"
              value={props.title}
              onChange={props.onChangeTitle}
              tabIndex={1}
            />
            {props.tagInput}
          </div>
        </div>
        <div className={markdownWrapper}>{props.editor}</div>
      </div>
      {props.footer}
    </div>
  );
}

const editorBlock = css.raw({
  minW: '0px',
  flex: 1,
  display: 'flex',
  flexDir: 'column',
  position: 'relative',
});

const leftBlock = css(
  editorBlock,
  css.raw({
    bg: 'bg_editor',
    zIndex: 1,
    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.04)',
  }),
);

const wrapper = css({
  minHeight: 0,
  // paddingBottom: '4rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const writeHead = css({});

const titleInput = css({
  height: '42x',
  bg: 'transparent',
  padding: 0,
  fontSize: '1.5rem',
  width: '100%',
  outline: 'none',
  border: 'none',
  fontWeight: 'bold',
  color: 'text1',
  mb: '8px',
  md: {
    height: '60px',
    fontSize: '2.5rem',
    mb: '12px',
  },
  _placeholder: {
    color: 'text3',
  },
});

const markdownWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  '& .w-md-editor': {
    backgroundColor: 'bg_editor !important',
    borderRadius: '0 !important',
    boxShadow: 'none !important',
  },
});

export default MarkdownEditor;
