import { css } from '@styled-system/css';

const containerStyle = {
  position: 'relative',
  maxWidth: '1080px',
  mx: 'auto',
  md: {
    px: '6',
  },
};

export const container = css({
  ...containerStyle,
});

export const containerRaw = css.raw({
  ...containerStyle,
});
