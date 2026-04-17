import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Font ──────────────────────────────────────────────
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },

      // ─── Font Size ───────────────────────────────────────────
      fontSize: {
        'xxs': ['10px', { lineHeight: '1.4' }],
      },

      // ─── Spacing (Base DS tokens) ──────────────────────────
      spacing: {
        'xxxs': '2px',
        'xxs':  '4px',
        'xs':   '8px',
        'icon-btn': '10px',
        's':    '12px',
        'm':    '16px',
        'l':    '20px',
        'xl':   '24px',
        'xxl':  '32px',
        'xxxl': '40px',
        '2xxxl':'48px',
        '3xxxl':'56px',
        '4xl':  '64px',
        '5xl':  '72px',
        '6xl':  '80px',
      },

      // ─── Border Radius ─────────────────────────────────────
      borderRadius: {
        'popup':  '24px',
        'card':   '12px',
        'button': '8px',
        'pill':   '9999px',
      },

      // ─── Colors ────────────────────────────────────────────
      colors: {
        // Primitives
        accent: {
          DEFAULT:    '#4a3ec6',
          hover:      '#6b62d0',
          dark:       '#3126ab',
          'dark-hover': '#3c2ed1',
          light:      '#988efc',
          'ultra-light': '#e7ebff',
        },
        secondary: {
          DEFAULT:    '#82a1ff',
          hover:      '#4d79ff',
          'ultra-dark': '#222132',
          surface:    '#252535',
        },
        brand: {
          yellow:     '#ffc163',
          purple:     '#ab37f0',
          blue:       '#0a92ff',
        },
        gradient: {
          purple:       '#9d76ff',
          blue:         '#1ec8e8',
          'warm-light': '#ffca85',
          'warm-mid':   '#ffaf75',
          'warm-dark':  '#ff7a38',
        },

        // Credit pill
        credit: {
          bg:     '#2b1f0e',
          gold:   '#f5c842',
          orange: '#e8732a',
        },

        // Avatar default fill
        avatar: {
          DEFAULT: '#7b72e8',
        },

        // Grays — consolidated into page-bg and chat-* tokens; gray-* removed

        // Status
        status: {
          alert:      '#de5a48',
          error:      '#f33621',
          warning:    '#ffc32a',
          success:    '#b3d661',
          positive:   '#398b4d',
          idle:       '#0397eb',
          info:       '#67c3bb',
        },

        // Semantic — Dark theme
        'secondary-surface': 'var(--secondary-surface)',
        footer: {
          bg:         '#111111',
        },
        page: {
          bg:         '#171717',
          footer:     '#000000cc',
          divider:    '#ffffff1a',
          icon:       '#ffffff',
          overlay:    '#000000b2',
        },
        text: {
          title:      '#ffffff',
          subtitle:   '#ffffffcc',
          body:       '#ffffffb2',
          label:      '#ffffffb2',
          small:      '#ffffff99',
          xsmall:     '#ffffff80',
          dim:        '#ffffff66',
          xxsmall:    '#ffffff4d',
        },
        // button-* removed — use accent-* and secondary-* directly
        nav: {
          bg:         '#ffffff00',
          border:     '#ffffff0d',
          'hover-bg': '#ffffff1a',
          'active-bg': '#ffffff1a',
          icon:       '#ffffffcc',
          'active-icon': '#ffffff',
          'active-title': '#ffffff',
        },
        header: {
          bg:         '#ffffff00',
          border:     '#ffffff1a',
          'icon-border':    '#ffffff1a',
          'icon-hover-bg':  '#ffffff0d',
        },
        popup: {
          bg:         '#ffffff1a',
          'close-icon': '#ffffffcc',
          border:     '#ffffff00',
          divider:    '#ffffff1a',
        },
        coachmark: {
          bg:         '#1e1d2e',
        },
        forms: {
          bg:         '#ffffff0d',
          border:     '#ffffff1a',
          text:       '#ffffff80',
          'focus-border': '#82a1ff',
          'error-border': '#de5a48',
          'active-bg': '#222132',
          'disabled-bg': '#888888',
          // active-border and link removed — use secondary directly
        },
        tabs: {
          bg:         '#ffffff00',
          'hover-bg': '#ffffff33',
          'active-bg': '#ffffff4d',
          'active-bar': '#82a1ff',
          border:     '#ffffff0d',
        },
        card: {
          bg:         '#ffffff00',
          border:     '#ffffff0d',
          'hover-bg': '#ffffff1a',
          'hover-border': '#4a3ec6',
        },
        chat: {
          'ai-bubble':      '#393535',
          'ai-active':      '#2a2727',
          'user-bubble':    '#4a3ec6',
          'premium-border': '#f4da5c',
          'badge':          '#de5a48',
          'scrim-bottom':   '#000000',
        },
        // White/Black alpha utilities
        'white-05':  '#ffffff0d',
        'white-10':  '#ffffff1a',
        'white-20':  '#ffffff33',
        'white-30':  '#ffffff4d',
        'white-40':  '#ffffff66',
        'white-50':  '#ffffff80',
        'white-60':  '#ffffff99',
        'white-70':  '#ffffffb2',
        'white-80':  '#ffffffcc',
        'white-90':  '#ffffffe5',
        'black-05':  '#0000000d',
        'black-10':  '#0000001a',
        'black-20':  '#00000033',
        'black-30':  '#0000004d',
        'black-40':  '#00000066',
        'black-50':  '#00000080',
        'black-60':  '#00000099',
        'black-70':  '#000000b2',
        'black-80':  '#000000cc',
        'black-55':  '#0000008c',
        'black-90':  '#000000e5',
        // Profile screen
        'profile-sheet-bg': '#1a1a1a',
      },

      // ─── Backdrop Blur ─────────────────────────────────────
      backdropBlur: {
        'bg': '12px',
        'medium': '32px',
        'popup': '60px',
        'heavy': '120px',
      },

      // ─── Box Shadow (effect styles) ────────────────────────
      boxShadow: {
        'small':  '0 1px 4px rgba(0,0,0,0.3)',
        'normal': '0 4px 12px rgba(0,0,0,0.4)',
        'big':    '0 8px 32px rgba(0,0,0,0.6)',
        'popup':  '0 8px 24px rgba(0,0,0,0.12)',
        'button': '0 2px 8px rgba(74,62,198,0.4)',
        'dark':   '0 4px 16px rgba(0,0,0,0.8)',
      },

      // ─── Screen breakpoints ────────────────────────────────
      screens: {
        'mobile': '414px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}

export default config
