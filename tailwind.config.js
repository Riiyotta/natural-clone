/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        miso: ['"STK Miso"', '"STK Miso fallback"', 'monospace'],
        mono: ['"GT Standard Mono"', '"GT Standard Mono fallback"', 'monospace'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        background: {
          1: '#ffffff',
          2: '#f9f9f8',
          hover: '#fbfbfa',
          'secondary-hover': '#f4f4f3',
          button: 'rgb(22, 21, 20)',
          'button-hover': '#969594',
        },
        text: {
          primary: 'rgb(22, 21, 20)',
          'primary-hover': '#969594',
          secondary: 'rgb(113, 112, 111)',
          tertiary: 'rgb(215, 214, 212)',
          'on-color': '#ffffff',
        },
        'card-border': 'rgb(246, 246, 246)',
        gray: {
          50: '#fbfbfa',
          100: '#fbfbfa',
          300: '#e6e5e4',
          400: '#d7d6d4',
          500: '#d7d6d4',
        },
      },
      spacing: {
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        // Without this key, `h-36`/`w-36` silently fall back to Tailwind's default
        // core scale (36 = 9rem = 144px) instead of 36px. Measured live: the Control
        // card's edit-icon button is a 36x36 circle.
        36: '36px',
        40: '40px',
        48: '48px',
        56: '56px',
        // Without this key, `gap-60` falls through to Tailwind's default core scale
        // (60 = 15rem = 240px). Measured live: 60px between the Developers tab row
        // and the terminal card.
        60: '60px',
        64: '64px',
        72: '72px',
        80: '80px',
        120: '120px',
        160: '160px',
        200: '200px',
        240: '240px',
        280: '280px',
        320: '320px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '10px',
        '2xl': '16px',
        '3xl': '24px',
        window: '24px',
        pill: '20px',
        ghost: '1.5px',
      },
      boxShadow: {
        soft: '0px 4px 16px 0px #0000000a',
        strong: '0px 4px 32px 0px #00000014',
        sandbox: '0 -2px 12px #0000000a, 0 2px 6px #1815140f, 0 10px 28px #18151424',
      },
      lineHeight: {
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        // Without this key, `leading-28` matches no utility and the element silently
        // inherits the ambient 24px line-height. Measured live: the Control card's
        // agent name is 20px/28px.
        28: '28px',
        32: '32px',
        40: '40px',
        48: '48px',
        56: '56px',
      },
      height: {
        80: '80px',
      },
      transitionTimingFunction: {
        // The original uses the plain CSS `ease-out` keyword (cubic-bezier(0,0,.58,1)),
        // not Tailwind's default `ease-out` (cubic-bezier(0,0,.2,1)) — different curve.
        out: 'ease-out',
        enter: 'cubic-bezier(.24,1,.36,1)',
        morph: 'cubic-bezier(.645,.045,.355,1)',
        'in-out-quart': 'cubic-bezier(.77,0,.175,1)',
        'in-out-circ': 'cubic-bezier(.785,.135,.15,.86)',
        pressable: 'cubic-bezier(.24,.8,.24,1)',
      },
    },
  },
  plugins: [],
}
