import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/lib/styles/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
    semanticTokens: {
      colors: {
        primary1: {
          value: {
            _light: '{colors.blue.400}',
            _dark: '{colors.blue.500}',
          },
        },
        text1: {
          value: {
            _light: '{colors.zinc.900}',
            _dark: '{colors.zinc.100}',
          },
        },
        text2: {
          value: {
            _light: '{colors.zinc.800}',
            _dark: '{colors.zinc.200}',
          },
        },
        text3: {
          value: {
            _light: '{colors.zinc.700}',
            _dark: '{colors.zinc.300}',
          },
        },
        text4: {
          value: {
            _light: '{colors.zinc.600}',
            _dark: '{colors.zinc.400}',
          },
        },
        text5: {
          value: {
            _light: '{colors.zinc.500}',
            _dark: '{colors.zinc.500}',
          },
        },
        text6: {
          value: {
            _light: '{colors.zinc.400}',
            _dark: '{colors.zinc.600}',
          },
        },
        text7: {
          value: {
            _light: '{colors.zinc.300}',
            _dark: '{colors.zinc.700}',
          },
        },
        text8: {
          value: {
            _light: '{colors.zinc.200}',
            _dark: '{colors.zinc.800}',
          },
        },
        text9: {
          value: {
            _light: '{colors.zinc.100}',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_page1: {
          value: {
            _light: '{colors.white}',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_page2: {
          value: {
            _light: '{colors.zinc.50}',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_element1: {
          value: {
            _light: '{colors.zinc.100}',
            _dark: '{colors.zinc.800}',
          },
        },
        bg_element2: {
          value: {
            _light: '{colors.zinc.200}',
            _dark: '{colors.zinc.700}',
          },
        },
        outline1: {
          value: {
            _light: '{colors.zinc.200}',
            _dark: '{colors.zinc.700}',
          },
        },
        outline2: {
          value: {
            _light: '{colors.zinc.200}',
            _dark: '{colors.zinc.700}',
          },
        },
      },
      shadows: {
        shadow1: {
          value: {
            _light: '0px 2px 16px rgba(0, 0, 0, 0.05)',
            _dark: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },

  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
