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
import { getPostById, writePost } from '@/lib/api/post';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tag } from '@prisma/client';
import { toast } from 'react-toastify';
import PublishScreen from '@/components/write/PublishScreen';
import { escapeForUrl } from '@/lib/utils';
import usePublishStore from '@/lib/store/modules/usePublish';

const MarkdownEditor = dynamic(
  () => import('@/components/write/MarkdownEditor'),
  {
    ssr: false,
  },
);

function EditorContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [title, onChangeTitle, setTitle] = useInput('');
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [initialBody, setInitialBody] = useState<string>('');
  const [published, setPublished] = useState<boolean>(false);

  const { setPublishStore } = usePublishStore();

  const [upload, file] = useUpload();
  const { upload: serverUpload, image } = useServerUpload();

  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  const { theme, systemTheme } = useTheme();

  const onPublish = () => {
    setPublishStore({
      ...usePublishStore.getState(),
      title,
      tags,
      body: markdown,
      description: '',
      isTemp: false,
      thumbnail: '',
      urlSlug: escapeForUrl(title),
    });

    if (!title || !markdown) {
      toast.error('제목 또는 본문이 비어있습니다.', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        theme: theme || systemTheme,
      });
      return;
    }

    setPublished(true);
  };

  const onTempSave = useCallback(async () => {
    if (!title || !markdown) {
      toast.error('제목 또는 본문이 비어있습니다.', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        theme: theme || systemTheme,
      });
      return;
    }

    const response = await writePost({
      id: Number(postId),
      title,
      tags,
      body: markdown,
      description: '',
      isTemp: true,
      thumbnail: '',
      urlSlug: escapeForUrl(title),
    });

    if (response.payload.postId) {
      toast.success('포스트가 임시저장되었습니다.', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
        theme: theme || systemTheme,
      });

      router.push(`/write?id=${response.payload.postId}`);
    }
  }, [title, tags, markdown]);

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

  const preparePost = async (postId: number) => {
    const response = await getPostById(postId);
    if (!response.payload) return;
    const { title, tags, body } = response.payload;
    setTitle(title);
    setTags((prev) => {
      const newTags = tags.map((tag: Tag) => tag.name);
      const diff = newTags.filter((tag: string) => !prev.includes(tag));
      return [...prev, ...diff];
    });
    setInitialBody(body);
    setMarkdown(body);
  };

  const handleCancelPublish = () => {
    setPublished(false);
  };

  useEffect(() => {
    if (!postId) return;
    preparePost(Number(postId));
  }, [postId]);

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
          initialBody={initialBody}
          theme={theme === 'system' ? systemTheme : theme}
          footer={
            <WriteFooter
              edit={!!postId}
              onPublish={onPublish}
              onTempSave={onTempSave}
            />
          }
        />
      </div>
      <div className={rightBlock}>
        <MarkdownPreview title={title} markdown={markdown} />
      </div>
      <PublishScreen visible={published} onClose={handleCancelPublish} />
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
