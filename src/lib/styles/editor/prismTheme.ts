import { css } from '@styled-system/css';

export const prismTheme = css.raw({
  '& pre': {
    bg: 'prism_bg',
  },

  '& code[class*="language-"], & pre[class*="language-"]': {
    color: 'prism_default_text',
    bg: 'none',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',

    tabSize: 4,
    hyphens: 'none',
  },

  '& pre[class*="language-"]::-moz-selection, & pre[class*="language-"] ::-moz-selection, code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection':
    {
      textShadow: 'none',
      bg: 'prism_selection_bg',
    },

  '& pre[class*="language-"]::selection, & pre[class*="language-"] ::selection, code[class*="language-"]::selection, code[class*="language-"] ::selection':
    {
      textShadow: 'none',
      bg: 'prism_selection_bg',
    },

  '@media print': {
    '& code[class*="language-"], & pre[class*="language-"]': {
      textShadow: 'none',
    },
  },

  '& pre[class*="language-"]': {
    p: '1rem',
    m: '0.5rem 0',
    overflow: 'auto',
  },

  '&:not(pre) > code[class*="language-"]': {
    p: '0.1em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },

  '& .token.comment, & .token.prolog, & .token.doctype, & .token.cdata': {
    color: 'prism_code_1',
  },

  '& .token.punctuation': {
    color: 'prism_code_2',
  },

  '& .token.selector, & .token.tag': {
    color: 'prism_code_3',
  },

  '& .token.property, & .token.boolean, & .token.number, & .token.constant, & .token.symbol, & .token.deleted, & .token.attr-name':
    {
      color: 'prism_code_4',
    },

  '& .token.string, & .token.char, & .token.attr-value, & .token.builtin, & .token.inserted':
    {
      color: 'prism_code_6',
    },

  '& .token.operator, & .token.entity, & .token.url, & .language-css .token.string, & .style .token.string':
    {
      color: 'prism_code_5',
    },

  '& .token.atrule, & .token.keyword': {
    color: 'prism_code_7',
  },

  '& .token.function': {
    color: 'prism_code_8',
  },

  '& .token.regex, & .token.important, & .token.variable': {
    color: 'prism_code_9',
  },

  '& .token.important, & .token.bold': {
    fontWeight: 'bold',
  },

  '& .token.italic': {
    fontStyle: 'italic',
  },

  '& .token.entity': {
    cursor: 'help',
  },

  '& pre.line-numbers': {
    position: 'relative',
    pl: '3.8em',
    counterReset: 'lineNumber',
  },

  '& pre.line-numbers > code': {
    position: 'relative',
  },

  '& .line-numbers .line-numbers-rows': {
    position: 'absolute',
    pointerEvents: 'none',
    top: '0',
    fontSize: '100%',
    left: '-3.8em',
    width: '3em',
    letterSpacing: '-1px',
    borderRight: '0',
    userSelect: 'none',
  },

  '& .line-numbers-rows > span': {
    pointerEvents: 'none',
    display: 'block',
    counterIncrement: 'lineNumber',
  },

  '& .line-numbers-rows > span:before': {
    content: 'counter(lineNumber)',
    color: 'prism_line_number',
    display: 'block',
    textAlign: 'right',
    paddingRight: '0.8em',
  },
});
