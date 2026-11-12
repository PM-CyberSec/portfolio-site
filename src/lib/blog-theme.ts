export interface BlogTheme {
  accent: string;
  soft: string;
  faint: string;
  line: string;
  border: string;
  glow: string;
}

const themes: Record<string, BlogTheme> = {
  SOC: {
    accent: '#00FFCC',
    soft: 'rgba(0, 255, 204, 0.12)',
    faint: 'rgba(0, 255, 204, 0.045)',
    line: 'rgba(0, 255, 204, 0.14)',
    border: 'rgba(0, 255, 204, 0.24)',
    glow: 'rgba(0, 255, 204, 0.28)',
  },
  Detection: {
    accent: '#FBBF24',
    soft: 'rgba(251, 191, 36, 0.12)',
    faint: 'rgba(251, 191, 36, 0.045)',
    line: 'rgba(251, 191, 36, 0.14)',
    border: 'rgba(251, 191, 36, 0.24)',
    glow: 'rgba(251, 191, 36, 0.28)',
  },
  Networking: {
    accent: '#60A5FA',
    soft: 'rgba(96, 165, 250, 0.12)',
    faint: 'rgba(96, 165, 250, 0.045)',
    line: 'rgba(96, 165, 250, 0.14)',
    border: 'rgba(96, 165, 250, 0.24)',
    glow: 'rgba(96, 165, 250, 0.28)',
  },
  IR: {
    accent: '#FB7185',
    soft: 'rgba(251, 113, 133, 0.12)',
    faint: 'rgba(251, 113, 133, 0.045)',
    line: 'rgba(251, 113, 133, 0.14)',
    border: 'rgba(251, 113, 133, 0.24)',
    glow: 'rgba(251, 113, 133, 0.28)',
  },
  'Incident Response': {
    accent: '#FB7185',
    soft: 'rgba(251, 113, 133, 0.12)',
    faint: 'rgba(251, 113, 133, 0.045)',
    line: 'rgba(251, 113, 133, 0.14)',
    border: 'rgba(251, 113, 133, 0.24)',
    glow: 'rgba(251, 113, 133, 0.28)',
  },
  'Security Engineering': {
    accent: '#A78BFA',
    soft: 'rgba(167, 139, 250, 0.12)',
    faint: 'rgba(167, 139, 250, 0.045)',
    line: 'rgba(167, 139, 250, 0.14)',
    border: 'rgba(167, 139, 250, 0.24)',
    glow: 'rgba(167, 139, 250, 0.28)',
  },
  Labs: {
    accent: '#34D399',
    soft: 'rgba(52, 211, 153, 0.12)',
    faint: 'rgba(52, 211, 153, 0.045)',
    line: 'rgba(52, 211, 153, 0.14)',
    border: 'rgba(52, 211, 153, 0.24)',
    glow: 'rgba(52, 211, 153, 0.28)',
  },
};

const fallback = themes.SOC;

export function getBlogTheme(category?: string): BlogTheme {
  return (category && themes[category]) || fallback;
}
