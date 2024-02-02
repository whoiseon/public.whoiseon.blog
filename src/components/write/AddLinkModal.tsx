import { useInput } from '@/lib/hooks/useInput';
import { useCallback, useRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { css } from '@styled-system/css';
import zIndexes from '@/lib/styles/zIndexes';
import Button from '@/components/system/Button';

interface Props {
  left: number;
  top: number | null;
  bottom: number | null;
  stickToRight?: boolean;
  onConfirm: (link: string) => void;
  onClose: () => void;
  onDelete?: () => void;
}

function AddLinkModal({
  left,
  top,
  bottom,
  stickToRight,
  onClose,
  onConfirm,
  onDelete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, onChange] = useInput('');

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(value);
    },
    [value, onConfirm],
  );

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className={modalBlock}
        style={{
          left: stickToRight ? 'initial' : left,
          top: top || 'initial',
          bottom: bottom || 'initial',
          right: stickToRight ? '2.5rem' : 'initial',
        }}
      >
        <div className={wrapper}>
          <div className={css({ mb: '0.75rem' })}>
            <div
              className={css({
                color: 'text2',
              })}
            >
              링크 등록
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className={css({ display: 'flex', gap: '0.5rem' })}
          >
            <input
              value={value}
              onChange={onChange}
              ref={inputRef}
              className={css({
                bg: 'bg_editor',
                flex: 1,
                outline: 'none',
                borderBottom: '1px solid',
                borderColor: 'outline4',
                transition: 'all 0.16s',
                _focus: {
                  borderColor: 'blue.400',
                },
              })}
              placeholder="URL을 입력하사세요"
            />
            <Button type="submit" variant="solid" size="md">
              등록
            </Button>
          </form>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

const modalBlock = css({
  zIndex: 5,
  position: 'absolute',
  mb: '1rem',
});

const wrapper = css({
  mt: '1rem',
  w: '20rem',
  bg: 'bg_editor',
  px: '1rem',
  pt: '1rem',
  pb: '1.825rem',
  border: '1px solid',
  borderColor: 'outline3',
  borderRadius: '4px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
});

export default AddLinkModal;
