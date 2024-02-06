'use client';

import { useEffect, useRef, useState } from 'react';
import { css } from '@styled-system/css';
import { ImImage } from '@react-icons/all-files/im/ImImage';
import usePublishStore from '@/lib/store/modules/usePublish';
import Button from '@/components/system/Button';
import { useInput } from '@/lib/hooks/useInput';
import { useServerUpload } from '@/lib/hooks/useServerUpload';
import { useUpload } from '@/lib/hooks/useUpload';
import Image from 'next/image';

interface Props {
  visible: boolean;
  onClose: () => void;
}

function PublishScreen({ visible, onClose }: Props) {
  const { title, tags, body, description, isTemp, thumbnail, urlSlug } =
    usePublishStore();
  const [animate, setAnimate] = useState(false);
  const [maxDescriptionLength, setMaxDescriptionLength] = useState(150);
  const [descriptionValue, onChangeDescription] = useInput('');

  const [upload, file] = useUpload();
  const { upload: uploadThumbnail, image } = useServerUpload();

  useEffect(() => {
    if (!file) return;
    uploadThumbnail(file, true);
  }, [file]);

  useEffect(() => {
    let timeoutId: null | ReturnType<typeof setTimeout> = null;
    if (visible) {
      setAnimate(true);
    } else if (!visible && animate) {
      timeoutId = setTimeout(() => {
        setAnimate(false);
      }, 125);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, animate]);

  if (!visible && !animate) return null;

  return (
    <div className={publishScreenBlock(visible)}>
      <div className={wrapper}>
        <h2 className={css({ fontSize: '1.125rem', mb: '1rem' })}>
          포스트 미리보기
        </h2>
        {image ? (
          <Image src={image} alt={title} width={380} height={213.75} />
        ) : (
          <button className={imageUploadButton} onClick={upload}>
            <ImImage />
            <span>썸네일 업로드</span>
          </button>
        )}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            mb: '1.5rem',
          })}
        >
          <h3 className={css({ mb: '0.5rem' })}>{title}</h3>
          <div>
            <textarea
              className={descriptionTextarea}
              placeholder="포스트 설명을 짧게 입력해보세요."
              value={descriptionValue}
              onChange={onChangeDescription}
              maxLength={maxDescriptionLength}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end',
            })}
          >
            <span
              className={css({
                fontSize: '0.75rem',
                color: 'text4',
              })}
            >{`${descriptionValue.length}/${maxDescriptionLength}`}</span>
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            gap: '0 1rem',
          })}
        >
          <Button onClick={onClose} layout="fullWidth">
            취소
          </Button>
          <Button
            className={css({
              fontWeight: 'bold',
            })}
            layout="fullWidth"
            variant="primary"
          >
            발행
          </Button>
        </div>
      </div>
    </div>
  );
}

const publishScreenBlock = (visible: boolean) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1rem',
    position: 'fixed',
    gap: '1rem 0',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    bg: 'bg_page1',
    zIndex: 25,
    animation: visible
      ? 'slideUp 0.25s forwards ease-in'
      : 'slideDown 0.25s forwards ease-in',

    md: {
      alignItems: 'center',
    },
  });

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  md: {
    width: '380px',
  },
});

const imageUploadButton = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem 0',
  mb: '1.5rem',
  justifyContent: 'center',
  width: '100%',
  height: '213.75px',
  borderRadius: 'sm',
  bg: 'bg_element1',
  cursor: 'pointer',
  md: {
    width: '380px',
  },
  color: 'text2',
  '& svg': {
    width: '48px',
    height: '48px',
    color: 'text4',
  },
});

const descriptionTextarea = css({
  width: '100%',
  height: '110px',
  borderRadius: 'sm',
  bg: 'bg_element1',
  color: 'text2',
  padding: '1rem',
  resize: 'none',
  outline: 'none',
  fontSize: '0.875rem',
});

export default PublishScreen;