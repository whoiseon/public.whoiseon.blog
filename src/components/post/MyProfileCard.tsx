import { css } from '@styled-system/css';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { IoMail } from '@react-icons/all-files/io5/IoMail';

function MyProfileCard() {
  return (
    <div
      className={css({
        px: '1rem',
        md: {
          px: 0,
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.5rem',
          md: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.5rem',
          },
        })}
      >
        <div
          className={css({
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            bg: 'bg_element1',
          })}
        ></div>
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              })}
            >
              <h3
                className={css({
                  color: 'text3',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                })}
              >
                Inseon Hwang
              </h3>
              <div
                className={css({
                  display: 'flex',
                  gap: '0.5rem',
                  '& svg': {
                    width: '1.25rem',
                    height: '1.25rem',
                    color: 'text4',
                    transition: 'color 0.2s',
                    _hover: {
                      color: 'text1',
                    },
                  },
                })}
              >
                <a href="https://github.com/whoiseon" target="_blank">
                  <FaGithub />
                </a>
                <a href="mailto:whois__@naver.com">
                  <IoMail />
                </a>
              </div>
            </div>
            <p
              className={css({
                fontSize: '1rem',
                color: 'text4',
                fontWeight: 'light',
                mt: '0.25rem',
              })}
            >
              아름다운 프로덕트를 만드는 것을 좋아하고, 그것을 위해 노력하고
              배우는 것을 즐기는 개발자입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileCard;
