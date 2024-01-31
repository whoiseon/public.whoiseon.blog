import { css } from '@styled-system/css';
import EditorContainer from '@/components/write/EditorContainer';

function Write() {
  return (
    <div className={block}>
      <EditorContainer />
    </div>
  );
}

const block = css({
  w: '100dvw',
  h: '100dvh',
});

export default Write;
