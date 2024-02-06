'use client';

import { css } from '@styled-system/css';
import { ChangeEventType } from '@/lib/hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import CodeMirror, { EditorFromTextArea } from 'codemirror';
import { detectIOS, detectJSDOM } from '@/lib/utils';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';

import 'codemirror/lib/codemirror.css';
import '@/lib/styles/editor/atom-one-light.css';
import '@/lib/styles/editor/atom-one-dark.css';
import Toolbar from '@/components/write/Toolbar';
import zIndexes from '@/lib/styles/zIndexes';
import AddLinkModal from '@/components/write/AddLinkModal';

const removeHeading = (text: string) => {
  return text.replace(/#{1,6} /, '');
};

type AddLinkModalState = {
  top: number | null;
  bottom: number | null;
  left: number;
  visible: boolean;
  stickToRight: boolean;
};

interface Props {
  onChangeTitle: (e: ChangeEventType) => void;
  onChangeMarkdown: (markdown: string) => void;
  onUpload: () => void;
  title: string;
  markdown: string;
  theme?: string;
  tagInput: React.ReactNode;
  footer: React.ReactNode;
  initialBody?: string;
  tempBlobImage?: string | null;
  lastUploadedImage?: string | null;
}

function MarkdownEditor({
  onChangeMarkdown,
  onChangeTitle,
  onUpload,
  title,
  markdown,
  theme,
  tagInput,
  footer,
  initialBody,
  tempBlobImage,
  lastUploadedImage,
}: Props) {
  const blockElement = useRef<HTMLDivElement>(null);
  const toolbarElement = useRef<HTMLDivElement>(null);
  const editorElement = useRef<HTMLTextAreaElement>(null);
  const appleEditorElement = useRef<HTMLTextAreaElement>(null);

  const [codemirror, setCodemirror] = useState<EditorFromTextArea | null>(null);
  const [addLinkModal, setAddLinkModal] = useState<AddLinkModalState>({
    top: null,
    bottom: null,
    left: 0,
    visible: false,
    stickToRight: false,
  });

  const isIOS = detectIOS();

  const initialize = () => {
    if (codemirror) return;
    if (isIOS) return;
    if (!editorElement.current) return;
    const cm = CodeMirror.fromTextArea(editorElement.current, {
      mode: 'markdown',
      theme: `one-${theme}`,
      placeholder: '당신의 이야기를 적어보세요...',
      lineWrapping: true,
    });

    if (detectJSDOM()) return;
    cm.setValue(initialBody || '');
    cm.on('change', (cm) => {
      onChangeMarkdown(cm.getValue());
      const doc = cm.getDoc();

      // scroll to bottom when editing last 5
      const { line } = doc.getCursor();
      const last = doc.lastLine();
      if (last - line < 5) {
        const preview = document.getElementById('preview');
        if (!preview) return;
        preview.scrollTop = preview.scrollHeight;
      }
    });

    setCodemirror(cm);
  };

  const handleOpenAddLinkModal = () => {
    if (!codemirror) return;
    const doc = codemirror.getDoc();
    const cursor = doc.getCursor();
    const cursorPosition = codemirror.cursorCoords(cursor);

    if (!blockElement.current) return;
    const stickToRight =
      cursorPosition.left > blockElement.current.clientWidth - 341;
    const calculatedTop =
      blockElement.current.scrollTop +
      cursorPosition.top +
      codemirror.defaultTextHeight() / 2 +
      1;

    const isAtTheBottom =
      calculatedTop + 173 > blockElement.current?.clientHeight;
    const position = isAtTheBottom
      ? { top: null, bottom: 64 }
      : { top: calculatedTop, bottom: null };

    setAddLinkModal({
      ...position,
      left: cursorPosition.left,
      stickToRight,
      visible: true,
    });
  };

  const handleAppleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChangeMarkdown(e.target.value);
  };

  const handleToolbarClick = (mode: string) => {
    if (isIOS) return handleToolbarClickForApple(mode);

    if (!codemirror) return;
    const doc = codemirror.getDoc();
    const cursor = doc.getCursor();
    const selection = {
      start: doc.getCursor('start'),
      end: doc.getCursor('end'),
    };
    const line = doc.getLine(cursor.line);
    const selectWholeLine = () => {
      doc.setSelection(
        { line: cursor.line, ch: 0 },
        { line: cursor.line, ch: line.length },
      );
    };

    const toolbarHandlers: { [key: string]: Function } = {
      ...[1, 2, 3, 4]
        .map((number) => () => {
          const characters = '#'.repeat(number);
          const plain = removeHeading(line);
          console.log('plain', plain);
          selectWholeLine();
          doc.replaceSelection(`${characters} ${plain}`);
        })
        .reduce((headingHandlers, handler, index) => {
          return Object.assign(headingHandlers, {
            [`heading${index + 1}`]: handler,
          });
        }, {}),
      bold: () => {
        const selected = doc.getSelection();

        if (selected === '텍스트') {
          const isBold = /\*\*(.*)\*\*/.test(
            doc.getRange(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            ),
          );

          if (isBold) {
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            );
            doc.replaceSelection('텍스트');
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch - 2 },
            );
            return;
          }
        }

        if (/\*\*(.*)\*\*/.test(selected)) {
          doc.replaceSelection(selected.replace(/\*\*/g, ''));
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`**${selected}**`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }

        doc.replaceSelection('**텍스트**');
        doc.setSelection(
          {
            line: cursor.line,
            ch: cursor.ch + 2,
          },
          {
            line: cursor.line,
            ch: cursor.ch + 5,
          },
        );
      },
      italic: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection('_텍스트_');
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 1,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 4,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            { line: selection.start.line, ch: selection.start.ch - 1 },
            { line: selection.start.line, ch: selection.end.ch + 1 },
          );

          if (/_(.*)_/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 1 },
              { line: selection.start.line, ch: selection.end.ch + 1 },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            };
          }
        }

        if (/_(.*)_/.test(selected)) {
          const plain = selected.replace(/^_/, '').replace(/_$/, '');
          doc.replaceSelection(plain);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`_${selected}_`);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch + 2 },
          );
          return;
        }
      },
      strike: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection('~~텍스트~~');
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 2,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 5,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            { line: selection.start.line, ch: selection.start.ch - 2 },
            { line: selection.start.line, ch: selection.end.ch + 2 },
          );

          if (/~~(.*)~~/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.start.line, ch: selection.end.ch + 2 },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            };
          }
        }

        if (/~~(.*)~~/.test(selected)) {
          const plain = selected.replace(/^~~/, '').replace(/~~$/, '');
          doc.replaceSelection(plain);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }

        if (selected.length > 0) {
          doc.replaceSelection(`~~${selected}~~`);
          doc.setSelection(
            { line: selection.start.line, ch: selection.start.ch },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }
      },
      blockquote: () => {
        const matches = /^> /.test(line);

        // select all current cursor line
        doc.setSelection(
          { line: cursor.line, ch: 0 },
          { line: cursor.line, ch: line.length },
        );

        if (matches) {
          doc.replaceSelection(line.replace(/^> /, ''));
          doc.setCursor({ line: cursor.line, ch: cursor.ch - 2 });
          return;
        } else {
          doc.replaceSelection(`> ${line}`);
          doc.setCursor({ line: cursor.line, ch: cursor.ch + 2 });
        }
      },
      codeBlock: () => {
        const selected = doc.getSelection();
        if (selected.length === 0) {
          doc.replaceSelection('```\n코드를 입력하세요\n```');
          doc.setSelection(
            { line: cursor.line + 1, ch: 0 },
            { line: cursor.line + 1, ch: 9 },
          );
          return;
        }
        doc.replaceSelection(`\`\`\`\n${selected}\n\`\`\``);
      },
      link: () => {
        handleOpenAddLinkModal();
      },
      image: () => {
        onUpload();
      },
    };

    const handler = toolbarHandlers[mode];
    if (!handler) return;
    handler();

    codemirror.focus();
  };

  const handleToolbarClickForApple = (mode: string) => {
    if (!appleEditorElement.current) return;
    const cursorPosition = appleEditorElement.current?.selectionStart || 0;
    const sliced = markdown.slice(0, cursorPosition);

    const lastNewLineIndex = sliced.lastIndexOf('\n');
    const textBefore = sliced.slice(0, lastNewLineIndex + 1);
    const textAfter = markdown.slice(lastNewLineIndex + 1, markdown.length);
    let currentNewLineIndex = textAfter.indexOf('\n');
    if (currentNewLineIndex === -1) currentNewLineIndex = textAfter.length;

    const lineText = textAfter.slice(0, currentNewLineIndex);
    const textBelowCurrentLine = textAfter.slice(
      currentNewLineIndex,
      textAfter.length,
    );

    const setCursorPosition = (position: number) => {
      setTimeout(() => {
        appleEditorElement.current!.selectionStart = position;
        appleEditorElement.current!.selectionEnd = position;
      }, 9);
    };

    const toolbarHandlers: { [key: string]: Function } = {
      heading1: () => {
        const applied = /^# /.test(lineText);
        if (applied) {
          const replacedLine = lineText.replace(/^# /, '');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          setCursorPosition(cursorPosition - 2);
          return;
        }

        const anotherHeading = /^#{1,4} /.test(lineText);
        if (anotherHeading) {
          const replacedLine = lineText.replace(/^# {1,4} /, '# ');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          const positionDiff = replacedLine.length - lineText.length;
          setCursorPosition(cursorPosition + positionDiff);
          return;
        }

        onChangeMarkdown(`${textBefore}# ${textAfter}`);
        setCursorPosition(cursorPosition + 2);
      },
      heading2: () => {
        const applied = /^## /.test(lineText);
        if (applied) {
          const replacedLine = lineText.replace(/^## /, '');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          setCursorPosition(cursorPosition - 3);
          return;
        }

        const anotherHeading = /^#{1,4} /.test(lineText);
        if (anotherHeading) {
          const replacedLine = lineText.replace(/^# {1,4} /, '## ');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          const positionDiff = replacedLine.length - lineText.length;
          setCursorPosition(cursorPosition + positionDiff);
          return;
        }

        onChangeMarkdown(`${textBefore}## ${textAfter}`);
        setCursorPosition(cursorPosition + 3);
      },
      heading3: () => {
        const applied = /^### /.test(lineText);
        if (applied) {
          const replacedLine = lineText.replace(/^### /, '');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          setCursorPosition(cursorPosition - 4);
          return;
        }

        const anotherHeading = /^#{1,4} /.test(lineText);
        if (anotherHeading) {
          const replacedLine = lineText.replace(/^# {1,4} /, '### ');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          const positionDiff = replacedLine.length - lineText.length;
          setCursorPosition(cursorPosition + positionDiff);
          return;
        }

        onChangeMarkdown(`${textBefore}### ${textAfter}`);
        setCursorPosition(cursorPosition + 4);
      },
      heading4: () => {
        const applied = /^#### /.test(lineText);
        if (applied) {
          const replacedLine = lineText.replace(/^#### /, '');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          setCursorPosition(cursorPosition - 5);
          return;
        }

        const anotherHeading = /^#{1,4} /.test(lineText);
        if (anotherHeading) {
          const replacedLine = lineText.replace(/^# {1,4} /, '#### ');
          onChangeMarkdown(
            `${textBefore}${replacedLine}${textBelowCurrentLine}`,
          );
          const positionDiff = replacedLine.length - lineText.length;
          setCursorPosition(cursorPosition + positionDiff);
          return;
        }

        onChangeMarkdown(`${textBefore}#### ${textAfter}`);
        setCursorPosition(cursorPosition + 5);
      },
    };

    const handler = toolbarHandlers[mode];
    appleEditorElement.current!.focus();
    if (!handler) return;
    handler();
  };

  const handleCancelAddLinkModal = () => {
    setAddLinkModal({
      ...addLinkModal,
      visible: false,
    });
  };

  const handleConfirmAddLink = (link: string) => {
    // insert link function
    setAddLinkModal({
      ...addLinkModal,
      visible: false,
    });

    if (!codemirror) return;

    const doc = codemirror.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor('end');
    codemirror.focus();

    if (selection.length === 0) {
      doc.replaceSelection(`[링크텍스트](${link})`);
      doc.setSelection(
        { line: cursor.line, ch: cursor.ch + 1 },
        { line: cursor.line, ch: cursor.ch + 6 },
      );
      return;
    }

    doc.replaceSelection(`[${selection}](${link})`);
    doc.setCursor({
      line: cursor.line,
      ch: cursor.ch + link.length + 4,
    });
  };

  const addImageToEditor = (image: string) => {
    if (isIOS) {
      const textarea = appleEditorElement.current;
      if (!textarea) return;

      const cursorPosition = textarea.selectionEnd;
      const textBefore = markdown.slice(0, cursorPosition);
      const textAfter = markdown.slice(cursorPosition, markdown.length);
      const imageMarkdown = `![](${encodeURI(image)})`;
      const nextMarkdown = `${textBefore}${imageMarkdown}${textAfter}`;
      onChangeMarkdown(nextMarkdown);
      setTimeout(() => {
        textarea.focus();
        const nextCursorPosition = cursorPosition + imageMarkdown.length;
        textarea.selectionStart = nextCursorPosition;
        textarea.selectionEnd = nextCursorPosition;
      }, 0);
    }

    if (!codemirror) return;
    const lines = codemirror.getValue().split('\n');
    const lineIndex = lines.findIndex((line) => line.includes('![업로드중..]'));
    if (lineIndex === -1) return;

    const startCh = lines[lineIndex].indexOf('![업로드중..');
    codemirror
      .getDoc()
      .replaceRange(
        `![](${encodeURI(image)})`,
        { line: lineIndex, ch: startCh },
        { line: lineIndex, ch: lines[lineIndex].length },
      );
  };

  const addTempImageBlobToEditor = (blobUrl: string) => {
    const imageMarkdown = `![업로드중..](${blobUrl})`;

    if (isIOS) return;
    if (!codemirror) return;
    codemirror.getDoc().replaceSelection(imageMarkdown);
  };

  useEffect(() => {
    if (!tempBlobImage) return;
    addTempImageBlobToEditor(tempBlobImage);
  }, [tempBlobImage]);

  useEffect(() => {
    if (!lastUploadedImage) return;
    addImageToEditor(lastUploadedImage);
  }, [lastUploadedImage]);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={markdownEditorBlock} ref={blockElement}>
      <div className={wrapper}>
        <div className={writeHead}>
          <div
            className={css({
              px: '1rem',
              pt: '1rem',
              md: { px: '2.5rem', pt: '1.5rem' },
            })}
          >
            <input
              type="text"
              className={titleInput}
              placeholder="제목을 입력하세요"
              value={title}
              onChange={onChangeTitle}
              tabIndex={1}
            />
            {tagInput}
          </div>
        </div>
        <Toolbar
          onClick={handleToolbarClick}
          innerRef={toolbarElement}
          ios={isIOS}
        />
        <div className={markdownWrapper}>
          {addLinkModal.visible && (
            <AddLinkModal
              left={addLinkModal.left}
              top={addLinkModal.top}
              bottom={addLinkModal.bottom}
              stickToRight={addLinkModal.stickToRight}
              onConfirm={handleConfirmAddLink}
              onClose={handleCancelAddLinkModal}
            />
          )}
          <textarea ref={editorElement} style={{ display: 'none' }} />
          {isIOS && (
            <textarea
              ref={appleEditorElement}
              className={appleTextareaStyle}
              value={markdown}
              onChange={handleAppleTextareaChange}
            />
          )}
        </div>
      </div>
      <div className={footerWrapper}>{footer}</div>
    </div>
  );
}

const markdownEditorBlock = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',

  '& .CodeMirror-lines': {
    pt: '4px !important',
    pb: '3rem !important',
    px: '0 !important',
  },

  '& .CodeMirror pre.CodeMirror-line, & .CodeMirror pre.CodeMirror-line-like': {
    padding: '0 1rem !important',
    md: {
      padding: '0 2.5rem !important',
    },
  },

  '& .CodeMirror': {
    minH: 0,
    flex: '1 !important',
    fontSize: '0.875rem !important',
    lineHeight: '1.5 !important',
    color: 'text2 !important',
    fontFamily: 'Fira Mono, monospace !important',
    bg: 'bg_editor !important',

    '& .cm-header': {
      lineHeight: '1.5 !important',
      color: 'text2 !important',
    },
    '& .cm-header-1': {
      fontSize: '2rem !important',
    },
    '& .cm-header-2': {
      fontSize: '1.5rem !important',
    },
    '& .cm-header-3': {
      fontSize: '1.15rem !important',
    },
    '& .cm-header-4, & .cm-header-5, & .cm-header-6': {
      fontSize: '1rem !important',
    },
    '& .CodeMirror-placeholder': {
      color: 'text4 !important',
      fontStyle: 'italic !important',
    },
    '& .cm-em, & .cm-strong': {
      color: 'text2 !important',
    },

    md: {
      fontSize: '1.125rem !important',
      '& .cm-header-1': {
        fontSize: '2.5rem !important',
      },
      '& .cm-header-2': {
        fontSize: '2rem !important',
      },
      '& .cm-header-3': {
        fontSize: '1.5rem !important',
      },
      '& .cm-header-4, & .cm-header-5, & .cm-header-6': {
        fontSize: '1.3125rem !important',
      },
    },
  },
});

const wrapper = css({
  minHeight: 0,
  paddingBottom: '4rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const writeHead = css({});

const titleInput = css({
  height: '42x',
  bg: 'transparent',
  padding: 0,
  fontSize: '1.5rem',
  width: '100%',
  outline: 'none',
  border: 'none',
  fontWeight: 'bold',
  color: 'text1',
  mb: '8px',
  md: {
    height: '60px',
    fontSize: '2.5rem',
    mb: '12px',
  },
  _placeholder: {
    color: 'text3',
  },
});

const markdownWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
});

const footerWrapper = css({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: zIndexes.WriteFooter,
  md: {
    width: '50%',
  },
});

const appleTextareaStyle = css({
  flex: 1,
  outline: 'none',
  fontSize: '0.875rem',
  px: '1rem',
  lineHeight: '1.5',
  pb: '1rem',
  color: 'text2',
  bg: 'bg_editor',
  fontFamily: 'Fira Mono, monospace',

  md: {
    fontSize: '1.125rem',
    px: '2.5rem',
    pb: '2.5rem',
  },
});

export default MarkdownEditor;
