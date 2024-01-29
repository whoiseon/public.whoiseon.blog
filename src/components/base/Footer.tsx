import { css } from '@styled-system/css';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styledFooter}>
      <div>
        Copyright 2024.{' '}
        <Link
          href="https://github.com/whoiseon"
          target="_blank"
          className={css({
            color: 'primary1',
            _hover: {
              textDecoration: 'underline',
            },
          })}
        >
          whoiseon
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}

const styledFooter = css({
  width: '100%',
  pt: 6,
  pb: 20,
  bg: 'bg_page1',
  color: 'text2',
  fontSize: 'sm',
  textAlign: 'center',

  md: {
    pt: 6,
    pb: 20,
  },
});

export default Footer;
