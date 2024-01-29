import { css } from '@styled-system/css';

const containerStyle = {
  position: 'relative',
  maxWidth: '5xl',
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
