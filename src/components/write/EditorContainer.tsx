'use client';

import MarkdownEditor from '@/components/write/MarkdownEditor';
import { css } from '@styled-system/css';
import { useInput } from '@/lib/hooks/useInput';
import TagInput from '@/components/write/TagInput';
import { useState } from 'react';
import WriteFooter from '@/components/write/WriteFooter';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@/components/write/MarkdownPreview';

function EditorContainer() {
  const [title, onChangeTitle] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string | undefined>('');

  const onPublish = () => {};

  const onTempSave = () => {};

  return (
    <div className={wrapper}>
      <MarkdownEditor
        title={title}
        onChangeTitle={onChangeTitle}
        tagInput={<TagInput tags={tags} onChange={setTags} />}
        editor={
          <MDEditor
            className={styledEditor}
            value={markdown}
            onChange={setMarkdown}
            preview="edit"
            height="100%"
            minHeight={100}
            visibleDragbar={false}
            highlightEnable={false}
            textareaProps={{
              placeholder: '오늘은 어떤 일이 있었나요?',
            }}
          />
        }
        footer={
          <WriteFooter
            edit={false}
            onPublish={onPublish}
            onTempSave={onTempSave}
          />
        }
      />
      <MarkdownPreview
        preview={
          <MDEditor.Markdown source={markdown} className={styledPreview} />
        }
        title={title}
        markdown={markdown}
      />
    </div>
  );
}

const wrapper = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  animation: 'fadeIn 0.5s ease-in-out forwards',
});

const styledEditor = css({
  '& > .w-md-editor-toolbar': {
    backgroundColor: 'transparent !important',
    borderBottom: 'none !important',
    borderRadius: '0 !important',
    p: '0 !important',
    overflowX: 'auto !important',
    scrollbarWidth: 'none !important',
    scrollBehavior: 'smooth !important',
    flexWrap: 'unset !important',
    width: 'auto !important',
    minH: '38px !important',
    mb: '22px !important',
    px: '0.5rem !important',
    md: {
      px: '2rem !important',
      minH: '42px !important',
    },

    '& > ul:first-of-type': {
      display: 'flex',
      width: '100%',
    },

    '& > ul:last-of-type': {
      display: 'none',
    },

    '& > ul > li.w-md-editor-toolbar-divider': {
      display: 'none !important',
    },

    '& > ul > li:last-of-type': {
      display: 'none !important',
    },

    // toolbar button
    '& > ul > li > button': {
      minWidth: '38px',
      minHeight: '38px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: '0 !important',
      m: '0 !important',
      borderRadius: 'full !important',
      sm: {
        minWidth: '42px',
        minHeight: '42px',
      },
      _hover: {
        backgroundColor: 'bg_element1 !important',
        '& > svg': {
          color: 'text1',
        },
      },

      '& > svg': {
        width: '18px',
        height: '18px',
        color: 'text4',
      },
    },
  },

  '& .w-md-editor-content': {
    '& .w-md-editor-text': {
      p: '0 !important',
      height: '100% !important',

      '& textarea': {
        px: '1rem !important',
        pb: '3rem !important',
        md: {
          px: '2.5rem !important',
          pb: '3rem !important',
        },

        fontSize: '1.125rem !important',
        color: 'text3 !important',
        lineHeight: '1.5 !important',

        _placeholder: {
          fontSize: '1.125rem !important',
          fontStyle: 'italic',
        },
      },
    },
  },

  '& .w-md-editor-bar': {
    display: 'none',
  },
});

const styledPreview = css({
  bg: 'bg_page1 !important',
  fontSize: '1.125rem !important',

  '& pre': {
    background: 'bg_element1 !important',
  },

  '& code': {
    background: 'bg_element1 !important',
  },

  '& hr': {
    background: 'outline2 !important',
    height: '1px !important',
  },

  '& h1, & h2, & h3, & h4, & h5, & h6': {
    border: 'none !important',
    mb: '1rem',
    mt: '2rem',
    pb: '0 !important',
  },

  '& blockquote': {
    borderLeft: '0.25em solid !important',
    borderColor: 'blue.300 !important',
    pl: '2rem !important',
    pr: '1rem !important',
    py: '1rem !important',
    background: 'bg_element1 !important',
    color: 'text2 !important',
  },
});

export default EditorContainer;
