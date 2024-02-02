'use client';

import { css } from '@styled-system/css';
import { useInput } from '@/lib/hooks/useInput';
import TagInput from '@/components/write/TagInput';
import { Suspense, useCallback, useEffect, useState } from 'react';
import WriteFooter from '@/components/write/WriteFooter';
import MarkdownPreview from '@/components/write/MarkdownPreview';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useUpload } from '@/lib/hooks/useUpload';
import { useServerUpload } from '@/lib/hooks/useServerUpload';

const MarkdownEditor = dynamic(
  () => import('@/components/write/MarkdownEditor'),
  {
    ssr: false,
  },
);

function EditorContainer() {
  const [title, onChangeTitle] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');

  const [upload, file] = useUpload();
  const { upload: serverUpload, image } = useServerUpload();

  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(
    null,
  );

  const { theme } = useTheme();

  const onPublish = () => {};

  const onTempSave = () => {};

  const uploadImage = useCallback(
    async (file: File) => {
      // temp image
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl);

      // server upload
      serverUpload(file);
    },
    [serverUpload],
  );

  useEffect(() => {
    if (!file) return;
    uploadImage(file);
  }, [file]);

  return (
    <div className={wrapper}>
      <div className={leftBlock}>
        <MarkdownEditor
          title={title}
          onChangeTitle={onChangeTitle}
          tagInput={<TagInput tags={tags} onChange={setTags} />}
          markdown={markdown}
          onChangeMarkdown={setMarkdown}
          onUpload={upload}
          tempBlobImage={imageBlobUrl}
          lastUploadedImage={image}
          theme={theme}
          footer={
            <WriteFooter
              edit={false}
              onPublish={onPublish}
              onTempSave={onTempSave}
            />
          }
        />
      </div>
      <div className={rightBlock}>
        <MarkdownPreview
          preview={<div>{markdown}</div>}
          title={title}
          markdown={markdown}
        />
      </div>
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

const rightBlock = css(
  editorBlock,
  css.raw({
    display: 'none',
    bg: 'bg_page1',
    md: {
      display: 'flex',
    },
  }),
);

const wrapper = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  animation: 'fadeIn 0.5s ease-in-out forwards',
});

export default EditorContainer;
