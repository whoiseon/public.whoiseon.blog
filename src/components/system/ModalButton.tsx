import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@/components/system/Dialog';
import { css } from '@styled-system/css';
import Button, { ButtonVariants } from '@/components/system/Button';

interface Props {
  children: React.ReactNode;
  title?: string;
  description: string;
  actionText?: string;
  actionVariant?: ButtonVariants;
  onClick?: Function;
}

function ModalButton({
  children,
  title,
  description,
  actionText,
  actionVariant = 'primary',
  onClick = Function,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'rgba(0, 0, 0, 0.15)',
          zIndex: 50,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          p: '1rem',
          animation: 'fadeIn 0.16s ease-out',
          md: {
            p: '0',
          },
        })}
      >
        <DialogContent
          className={css({
            maxWidth: '400px',
            width: '380px',
            bg: 'bg_page1',
            p: '1.5rem',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'outline2',
            animation: 'slideUp 0.1s ease-out forwards',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          })}
        >
          {title && (
            <DialogTitle
              className={css({
                fontSize: '1.25rem',
                fontWeight: 'bold',
              })}
            >
              {title}
            </DialogTitle>
          )}
          <DialogDescription
            className={css({
              my: '1rem',
              color: 'text3',
              lineHeight: '1.5',
            })}
          >
            {description}
          </DialogDescription>
          <div
            className={css({
              mt: '2rem',
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
            })}
          >
            <DialogClose asChild>
              <Button
                className={css({
                  fontWeight: 'bold',
                  py: '0.5rem',
                  px: '1.5rem',
                })}
              >
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={actionVariant}
                className={css({
                  fontWeight: 'bold',
                  py: '0.5rem',
                  px: '1.5rem',
                })}
                onClick={() => onClick()}
              >
                {actionText ? actionText : '확인'}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default ModalButton;
