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
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        slideInDown: {
          from: {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideOutUp: {
          from: {
            opacity: 1,
            transform: 'translateY(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateY(-100%)',
          },
        },
        slideUp: {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(100%)',
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary1: {
          value: {
            _light: '{colors.blue.400}',
            _dark: '{colors.blue.500}',
          },
        },
        primary2: {
          value: {
            _light: '{colors.blue.300}',
            _dark: '{colors.blue.600}',
          },
        },
        primary3: {
          value: {
            _light: '{colors.blue.200}',
            _dark: '{colors.blue.700}',
          },
        },
        primary_right: {
          value: {
            _light: '{colors.blue.500}',
            _dark: '{colors.blue.400}',
          },
        },
        destructive1: {
          value: {
            _light: 'rgb(255, 102, 102)',
            _dark: 'rgb(255, 102, 102)',
          },
        },
        destructive2: {
          value: {
            _light: 'rgb(236,90,90)',
            _dark: 'rgb(236,90,90)',
          },
        },
        destructive3: {
          value: {
            _light: 'rgb(208,90,90)',
            _dark: 'rgb(208,90,90)',
          },
        },
        text_reverse: {
          value: {
            _light: '{colors.zinc.900}',
            _dark: '{colors.zinc.100}',
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
        button_text1: {
          value: {
            _light: 'white',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_page1: {
          value: {
            _light: '{colors.white}',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_page1_alpha: {
          value: {
            _light: 'rgba(255, 255, 255, 0.9)',
            _dark: 'rgba(24, 24, 27, 0.9)',
          },
        },
        bg_page2: {
          value: {
            _light: '{colors.zinc.100}',
            _dark: '{colors.zinc.900}',
          },
        },
        bg_page3: {
          value: {
            _light: '{colors.zinc.50}',
            _dark: '{colors.zinc.950}',
          },
        },
        bg_editor: {
          value: {
            _light: '#fdfdfd',
            _dark: '#121214',
          },
        },
        bg_element0: {
          value: {
            _light: '{colors.zinc.50}',
            _dark: '#1F1F23',
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
        bg_element3: {
          value: {
            _light: '{colors.zinc.300}',
            _dark: '{colors.zinc.600}',
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
        outline3: {
          value: {
            _light: '{colors.zinc.300}',
            _dark: '{colors.zinc.600}',
          },
        },
        outline4: {
          value: {
            _light: '{colors.zinc.600}',
            _dark: '{colors.zinc.300}',
          },
        },
        editor_footer: {
          value: {
            _light: 'white',
            _dark: '{colors.zinc.800}',
          },
        },

        /* prism theme */
        prism_bg: {
          value: {
            _light: '{colors.zinc.100}',
            _dark: '{colors.zinc.800}',
          },
        },
        prism_default_text: {
          value: {
            _light: '#24292e',
            _dark: '#e0e6f1',
          },
        },
        prism_selection_bg: {
          value: {
            _light: 'rgba(0, 0, 0, 0.15)',
            _dark: '#383e49',
          },
        },
        prism_code_block_bg: {
          value: {
            _light: '#fbfcfd',
            _dark: '#1e1e1e',
          },
        },
        prism_code_1: {
          value: {
            _light: '#969896',
            _dark: '#7c858d',
          },
        },
        prism_code_2: {
          value: {
            _light: '#24292e',
            _dark: '#abb2bf',
          },
        },
        prism_code_3: {
          value: {
            _light: '#a626a4',
            _dark: '#e06c75',
          },
        },
        prism_code_4: {
          value: {
            _light: '#63a35c',
            _dark: '#d19a66',
          },
        },
        prism_code_5: {
          value: {
            _light: '#0184bc',
            _dark: '#98c379',
          },
        },
        prism_code_6: {
          value: {
            _light: '#50a14f',
            _dark: '#56b6c2',
          },
        },
        prism_code_7: {
          value: {
            _light: '#a626a4',
            _dark: '#c678dd',
          },
        },
        prism_code_8: {
          value: {
            _light: '#005cc5',
            _dark: '#61afef',
          },
        },
        prism_code_9: {
          value: {
            _light: '#a626a4',
            _dark: '#c678dd',
          },
        },
        prism_line_number: {
          value: {
            _light: '#585c63',
            _dark: '#5c6370',
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
