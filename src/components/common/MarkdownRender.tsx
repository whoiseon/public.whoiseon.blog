import Typography from '@/components/common/Typography';
import { css } from '@styled-system/css';
import { prismTheme } from '@/lib/styles/editor/prismTheme';
import React, { useEffect, useMemo, useState } from 'react';
import sanitize from 'sanitize-html';
import katexWhitelist from '@/lib/katexWhiteList';
import { remark } from 'remark';
import breaks from 'remark-breaks';
import remarkParse from 'remark-parse';
import prismPlugin from '@/lib/remark/prismPlugin';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import math from 'remark-math';
import katex from 'rehype-katex';
import stringify from 'rehype-stringify';
import slug from 'rehype-slug';
import { throttle } from 'throttle-debounce';
import parse from 'html-react-parser';

function strikeThrough(htmlString: string) {
  return htmlString.replace(/~~(.*?)~~/g, '<del>$1</del>');
}

function sanitizeEventScript(htmlString: string) {
  return htmlString.replace(/ on\w+="[^"]*"/g, '');
}

function filter(html: string) {
  const presanitized = sanitizeEventScript(html);
  return sanitize(presanitized, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'span',
      'img',
      'del',
      'input',

      ...katexWhitelist.tags,
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id', 'aria-hidden'],
      span: ['style'],
      input: ['type'],
      ol: ['start'],
      ...katexWhitelist.attributes,
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
      span: {
        ...katexWhitelist.styles,
      },
    },
    allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
  });
}

type RenderedElement = string | React.JSX.Element | React.JSX.Element[];

interface Props {
  markdown: string;
  editing?: boolean;
}

function MarkdownRender({ markdown, editing }: Props) {
  const [html, setHtml] = useState(
    filter(
      remark()
        .use(breaks)
        .use(slug)
        .use(remarkParse)
        .use(prismPlugin)
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(math)
        .use(katex)
        .use(stringify)
        .processSync(markdown)
        .toString(),
    ),
  );
  const [hasTagError, setHasTagError] = useState(false);
  const [element, setElement] = useState<RenderedElement | null>(null);
  const [delay, setDelay] = useState(25);

  const throttledUpdate = useMemo(() => {
    return throttle(delay, (markdown: string) => {
      remark()
        .use(breaks)
        .use(slug)
        .use(remarkParse)
        .use(prismPlugin)
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(math)
        .use(katex)
        .use(stringify)
        .process(markdown, (err: any, file: any) => {
          const lines = markdown.split(/\r\n|\r|\n/).length;
          const nextDelay = Math.max(
            Math.min(Math.floor(lines * 0.5), 1500),
            22,
          );

          if (nextDelay !== delay) {
            setDelay(nextDelay);
          }

          const html = strikeThrough(String(file));

          if (!editing) {
            setHtml(filter(html));
            return;
          }

          try {
            const el = parse(html);
            setElement(el);
          } catch (e) {}
        });
    });
  }, [delay, editing]);

  useEffect(() => {
    throttledUpdate(markdown);
  }, [markdown, throttledUpdate]);

  return (
    <Typography>
      {editing ? (
        <MarkdownRenderErrorBoundary
          onError={() => setHasTagError(true)}
          hasTagError={hasTagError}
        >
          <div className={markdownRenderBlock}>{element}</div>
        </MarkdownRenderErrorBoundary>
      ) : (
        <div
          className={markdownRenderBlock}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Typography>
  );
}

const markdownRenderBlockStyle = css.raw({
  '& pre': {
    fontFamily:
      'Fira Mono, source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    fontSize: '0.75rem',
    padding: '0.75rem',
    borderRadius: 'sm',
    lineHeight: '1.5',
    overflowX: 'auto',
    letterSpacing: '0px',
    my: '1.5rem',
    md: {
      fontSize: '0.875rem',
      padding: '1rem',
    },
  },

  '& img': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    my: '1.5rem',
  },

  '& iframe': {
    width: '768px',
    height: '430px',
    maxWidth: '100%',
    bg: 'black',
    display: 'block',
    m: 'auto',
    border: 'none',
    borderRadius: 'sm',
    overflow: 'hidden',
  },

  '& table': {
    minWidth: '40%',
    maxWidth: '100%',
    border: '1px solid',
    borderColor: 'outline2',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
    '& thead > tr > th': {
      borderBottom: '2px solid',
      borderColor: 'outline2',
    },
    '& th, & td': {
      padding: '0.5rem',
      wordBreak: 'break-word',
    },
    '& td + td, & th + th': {
      borderLeft: '1px solid',
      borderColor: 'outline2',
    },

    '& tr:nth-child(even)': {
      bg: 'bg_element1',
    },

    '& tr:nth-child(odd)': {
      bg: 'bg_page1',
    },
  },
});

const markdownRenderBlock = css(prismTheme, markdownRenderBlockStyle);

type ErrorBoundaryProps = {
  onError: () => void;
  hasTagError: boolean;
  children: React.ReactNode;
};

class MarkdownRenderErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };
  componentDidCatch() {
    this.setState({
      hasError: true,
    });
    this.props.onError();
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.hasTagError && !this.props.hasTagError) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>HTML 태그 파싱 실패</div>;
    }
    return this.props.children;
  }
}

export default MarkdownRender;
