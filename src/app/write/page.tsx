import { css } from '@styled-system/css';
import EditorContainer from '@/components/write/EditorContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Write() {
  return (
    <div className={block}>
      <EditorContainer />
      <ToastContainer />
    </div>
  );
}

const block = css({
  w: '100dvw',
  h: '100dvh',
});

export default Write;
