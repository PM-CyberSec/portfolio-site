/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0B1426', card: '#111827', elevated: '#1F2937' },
        accent: { DEFAULT: '#00FFCC', dim: 'rgba(0,255,204,0.12)' },
        brand: { blue: '#3B82F6' },
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
        text: { DEFAULT: '#F9FAFB', muted: '#CBD5E1', dim: '#94A3B8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: { card: '12px', btn: '8px', badge: '6px' },
      lineHeight: { tight: '1.25', snug: '1.375', normal: '1.5', relaxed: '1.625' },
      transitionProperty: {
        card: 'transform, box-shadow, border-color, background-color, opacity',
      },
      transitionDuration: { '250': '250ms', '300': '300ms' },
      transitionTimingFunction: { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    },
  },
  plugins: [],
};
