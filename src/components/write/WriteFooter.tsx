import { css } from '@styled-system/css';
import Button from '@/components/system/Button';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import { useGoBack } from '@/lib/hooks/useGoBack';

interface Props {
  edit: boolean;
  onPublish: () => void;
  onTempSave: () => void;
}

function WriteFooter({ edit, onPublish, onTempSave }: Props) {
  const onGoBack = useGoBack();

  return (
    <div className={block}>
      <Button
        onClick={onGoBack}
        className={css({
          bg: 'editor_footer',
          _hover: {
            _dark: {
              bg: 'zinc.700',
            },
          },
          ml: '-0.5rem',
          sm: {
            ml: '0',
          },
        })}
      >
        <MdArrowBack
          className={css({
            mr: '0',
            width: '20px',
            height: '20px',
            sm: { mr: '8px' },
          })}
        />
        <span
          className={css({
            display: 'none',
            sm: {
              display: 'block',
            },
          })}
        >
          나가기
        </span>
      </Button>
      <div
        className={css({ justifyContent: 'flex-end', alignItems: 'center' })}
      >
        <Button
          className={css({
            bg: 'editor_footer',
            mr: '0.5rem',
            _hover: {
              _dark: {
                bg: 'zinc.700',
              },
            },
          })}
          layout="inline"
        >
          임시저장
        </Button>
        <Button
          layout="inline"
          variant="primary"
          className={css({ fontWeight: 'bold' })}
        >
          {edit ? '수정하기' : '출간하기'}
        </Button>
      </div>
    </div>
  );
}

const block = css({
  px: '1rem',
  height: '4rem',
  width: 'full',
  boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.04)',
  bg: 'editor_footer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default WriteFooter;
