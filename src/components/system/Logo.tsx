import Link from 'next/link';
import { css } from '@styled-system/css';
import { Icons } from '@/components/system/Icons';

function Logo() {
  return (
    <Link href="/">
      <Icons.Logo className={styledLogo} />
    </Link>
  );
}

const styledLogo = css({
  width: '136px',
  color: 'text1',
});

export default Logo;
