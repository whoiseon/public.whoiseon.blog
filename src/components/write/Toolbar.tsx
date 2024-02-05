import { css } from '@styled-system/css';
import zIndexes from '@/lib/styles/zIndexes';
import { FaHeading } from '@react-icons/all-files/fa/FaHeading';
import { FaBold } from '@react-icons/all-files/fa/FaBold';
import { FaItalic } from '@react-icons/all-files/fa/FaItalic';
import { FaStrikethrough } from '@react-icons/all-files/fa/FaStrikethrough';
import { FaQuoteRight } from '@react-icons/all-files/fa/FaQuoteRight';
import { FaCode } from '@react-icons/all-files/fa/FaCode';
import { IoMdLink } from '@react-icons/all-files/io/IoMdLink';
import { IoMdImage } from '@react-icons/all-files/io/IoMdImage';

interface Props {
  onClick?: Function;
  innerRef?: React.RefObject<HTMLDivElement>;
  ios?: boolean;
}

function Toolbar({ onClick = () => {}, innerRef, ios }: Props) {
  return (
    <div id="toolbar" className={toolbarBlock} ref={innerRef}>
      {[1, 2, 3, 4].map((number) => (
        <button
          key={number}
          className={toolbarItem}
          value={number}
          onClick={() => onClick(`heading${number}`)}
        >
          <div className={heading}>
            <FaHeading />
            <span>{number}</span>
          </div>
        </button>
      ))}
      <div className={seperator} />
      {!ios && (
        <>
          <button
            className={`${toolbarItem} ${iconMD}`}
            onClick={() => onClick('bold')}
          >
            <FaBold />
          </button>
          <button
            className={`${toolbarItem} ${iconMD}`}
            onClick={() => onClick('italic')}
          >
            <FaItalic />
          </button>
          <button
            className={`${toolbarItem} ${iconMD}`}
            onClick={() => onClick('strike')}
          >
            <FaStrikethrough />
          </button>
          <div className={seperator} />
          <button
            className={`${toolbarItem} ${iconMD}`}
            onClick={() => onClick('blockquote')}
            value="blockquote"
          >
            <FaQuoteRight />
          </button>
          <button
            className={`${toolbarItem}`}
            onClick={() => onClick('codeBlock')}
          >
            <FaCode />
          </button>
          <button className={`${toolbarItem}`} onClick={() => onClick('link')}>
            <IoMdLink />
          </button>
        </>
      )}
      <button className={`${toolbarItem}`} onClick={() => onClick('image')}>
        <IoMdImage />
      </button>
    </div>
  );
}

const toolbarBlock = css({
  width: 'full',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  mb: '1rem',
  bg: 'bg_editor',
  zIndex: zIndexes.Toolbar,
  flexWrap: 'unset',
  px: '1rem',
  overflowX: 'auto',

  md: {
    px: '2.5rem',
    flexWrap: 'wrap',
    overflowX: 'unset',
  },
});

const toolbarItem = css({
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  color: 'text4',
  cursor: 'pointer',
  flexShrink: 0,
  borderRadius: 'full',
  transition: 'all 0.16s',

  md: {
    width: '3rem',
    height: '3rem',
    fontSize: '1.5rem',
  },

  _hover: {
    bg: 'bg_element1',
    color: 'text2',
  },
});

const iconMD = css({
  '& svg': {
    width: '1.125rem',
    height: '1.125rem',
  },
});

const heading = css({
  display: 'flex',
  alignItems: 'flex-start',
  fontSize: '1rem',
  fontWeight: 'bold',
  fontFamily: 'serif',
  '& span': {
    fontSize: '0.75rem',
  },

  '& svg': {},
});

const seperator = css({
  width: '1px',
  height: '1.25rem',
  bg: 'outline2',
  mx: '0.5rem',
});

export default Toolbar;
