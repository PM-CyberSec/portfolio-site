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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: { card: '12px', btn: '8px', badge: '6px' },
    },
  },
  plugins: [],
};
