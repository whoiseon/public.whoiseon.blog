import { css } from '@styled-system/css';

interface Props {
  children: React.ReactNode;
}

function Typography({ children }: Props) {
  return <div className={typographyBlock}>{children}</div>;
}

const typographyBlock = css({
  fontSize: '1rem',
  color: 'text2',
  transition: 'color 0.125s ease-in',
  lineHeight: '1.7',
  letterSpacing: '-0.004em',
  wordBreak: 'keep-all',
  wordWrap: 'break-word',

  '& ul': {
    listStyle: 'disc',
    pl: '2.5rem',
    my: '1.125rem',
  },

  '& ol': {
    listStyle: 'decimal',
    pl: '2.5rem',
    my: '1.125rem',
  },

  '& ul, & ol, & p': {
    '& b': {
      fontWeight: 400,
    },
    '& code': {
      bg: 'bg_element1',
      p: '0.2em 0.4em',
      fontSize: '85%',
      borderRadius: 'sm',
    },
    '& a': {
      '& code': {
        color: 'primary1',
      },
    },
  },

  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

  '& a': {
    color: 'primary_right',
    textDecoration: 'none',
    _hover: {
      color: 'primary_right',
      textDecoration: 'underline',
    },
  },

  '& code': {
    fontFamily:
      'Fira Mono, source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },

  '& hr': {
    border: 'none',
    height: '1px',
    width: 'full',
    bg: 'outline2',
    my: '2rem',
  },

  '& em': {
    fontStyle: 'italic',
  },

  '& p': {
    '& img': {
      display: 'block',
      margin: '0 auto',
      maxWidth: '100%',
      my: '3rem',
    },
  },

  '& h1': {
    fontSize: '2.25rem',
  },

  '& h2': {
    fontSize: '1.75rem',
  },

  '& h3': {
    fontSize: '1.25rem',
  },

  '& h4': {
    fontSize: '1rem',
  },

  '& h1, & h2, & h3, & h4': {
    fontWeight: 'bold',
    lineHeight: '1.5',
    mb: '0.75rem',
  },

  '& p + h1, & p + h2, & p + h3, & p + h4': {
    mt: '2rem',
  },

  '& blockquote': {
    my: '2rem',
    borderLeft: '4px solid',
    borderColor: 'primary1',
    borderTopRightRadius: 'sm',
    borderBottomRightRadius: 'sm',
    bg: 'bg_element1',
    mx: 0,
    py: '1rem',
    pr: '1rem',
    pl: '2rem',
    color: 'text1',

    '& ul, & ol': {
      pl: '1rem',
    },

    '& *:first-child': {
      mt: 0,
    },

    '& *:last-child': {
      mb: 0,
    },
  },

  md: {
    fontSize: '1.125rem',
    '& h1': {
      fontSize: '2.5rem',
    },
    '& h2': {
      fontSize: '2rem',
    },
    '& h3': {
      fontSize: '1.5rem',
    },
    '& h4': {
      fontSize: '1.125rem',
    },

    '& h1, & h2, & h3, & h4': {
      mb: '1rem',
    },

    '& p + h1, & p + h2, & p + h3, & p + h4': {
      mt: '2.5rem',
    },
  },
});

export default Typography;
