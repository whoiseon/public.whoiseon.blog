'use client';

import { css } from '@styled-system/css';
import { ChangeEventType } from '@/lib/hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import CodeMirror, { EditorFromTextArea } from 'codemirror';
import { detectIOS, detectJSDOM } from '@/lib/utils';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';

import 'codemirror/lib/codemirror.css';
import '@/lib/styles/editor/atom-one-light.css';
import '@/lib/styles/editor/atom-one-dark.css';

interface Props {
  onChangeTitle: (e: ChangeEventType) => void;
  onChangeMarkdown: (markdown: string) => void;
  title: string;
  markdown: string;
  theme?: string;
  tagInput: React.ReactNode;
  footer: React.ReactNode;
  initialBody?: string;
}

function MarkdownEditor({
  onChangeMarkdown,
  onChangeTitle,
  title,
  markdown,
  theme,
  tagInput,
  footer,
  initialBody,
}: Props) {
  const blockElement = useRef<HTMLDivElement>(null);
  const toolbarElement = useRef<HTMLDivElement>(null);
  const editorElement = useRef<HTMLTextAreaElement>(null);
  const appleEditorElement = useRef<HTMLTextAreaElement>(null);
  let codemirror: EditorFromTextArea | null = null;

  const [init, setInit] = useState<boolean>(false);
  const isIOS = detectIOS();

  const initialize = () => {
    if (init) return;
    if (isIOS) return;
    if (!editorElement.current) return;
    codemirror = CodeMirror.fromTextArea(editorElement.current, {
      mode: 'markdown',
      theme: `one-${theme}`,
      placeholder: '당신의 이야기를 적어보세요...',
      // viewportMargin: Infinity,
      lineWrapping: true,
    });

    if (detectJSDOM()) return;

    codemirror.setValue(initialBody || '');
    codemirror.on('change', (cm) => {
      onChangeMarkdown(cm.getValue());
      const doc = cm.getDoc();

      // scroll to bottom when editing last 5
      const { line } = doc.getCursor();
      const last = doc.lastLine();
      if (last - line < 5) {
        const preview = document.getElementById('preview');
        if (!preview) return;
        preview.scrollTop = preview.scrollHeight;
      }
    });

    setInit(true);
  };

  const handleAppleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChangeMarkdown(e.target.value);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={markdownEditorBlock}>
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
              value={title}
              onChange={onChangeTitle}
              tabIndex={1}
            />
            {tagInput}
          </div>
        </div>
        <div className={markdownWrapper}>
          <textarea ref={editorElement} style={{ display: 'none' }} />
          {isIOS && (
            <textarea
              ref={appleEditorElement}
              className={appleTextareaStyle}
              value={markdown}
              onChange={handleAppleTextareaChange}
            />
          )}
        </div>
      </div>
      <div className={footerWrapper}>{footer}</div>
    </div>
  );
}

const markdownEditorBlock = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',

  '& .CodeMirror-lines': {
    pt: '4px !important',
    pb: '3rem !important',
    px: '0 !important',
  },

  '& .CodeMirror pre.CodeMirror-line, & .CodeMirror pre.CodeMirror-line-like': {
    padding: '0 1rem !important',
    md: {
      padding: '0 2.5rem !important',
    },
  },

  '& .CodeMirror': {
    minH: 0,
    flex: '1 !important',
    fontSize: '0.875rem !important',
    lineHeight: '1.5 !important',
    color: 'text2 !important',
    fontFamily: 'Fira Mono, monospace !important',

    '& .cm-header': {
      lineHeight: '1.5 !important',
      color: 'text2 !important',
    },
    '& .cm-header-1': {
      fontSize: '2rem !important',
    },
    '& .cm-header-2': {
      fontSize: '1.5rem !important',
    },
    '& .cm-header-3': {
      fontSize: '1.15rem !important',
    },
    '& .cm-header-4, & .cm-header-5, & .cm-header-6': {
      fontSize: '1rem !important',
    },
    '& .CodeMirror-placeholder': {
      color: 'text4 !important',
      fontStyle: 'italic !important',
    },
    '& .cm-em, & .cm-strong': {
      color: 'text2 !important',
    },

    md: {
      fontSize: '1.125rem !important',
      '& .cm-header-1': {
        fontSize: '2.5rem !important',
      },
      '& .cm-header-2': {
        fontSize: '2rem !important',
      },
      '& .cm-header-3': {
        fontSize: '1.5rem !important',
      },
      '& .cm-header-4, & .cm-header-5, & .cm-header-6': {
        fontSize: '1.3125rem !important',
      },
    },
  },
});

const wrapper = css({
  minHeight: 0,
  paddingBottom: '4rem',
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
  minHeight: 0,
});

const footerWrapper = css({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 10,
  md: {
    width: '50%',
  },
});

const appleTextareaStyle = css({
  flex: 1,
  outline: 'none',
  fontSize: '0.875rem',
  px: '1rem',
  lineHeight: '1.5',
  pb: '1rem',
  color: 'text2',
  bg: 'bg_editor',

  md: {
    fontSize: '1.125rem',
    px: '2.5rem',
    pb: '2.5rem',
  },
});

export default MarkdownEditor;
