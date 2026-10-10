// Identidade visual do APP Scholar. Todas as telas e componentes leem daqui,
// então para mudar a cara do app basta ajustar este arquivo.

export const colors = {
  primary: '#1565C0',
  primaryDark: '#0D47A1',
  primarySoft: '#E3F2FD',

  background: '#F5F7FA',
  surface: '#FFFFFF',
  border: '#E1E6EC',

  text: '#1F2933',
  textMuted: '#6B7785',
  textOnPrimary: '#FFFFFF',

  danger: '#D32F2F',
  dangerSoft: '#FDECEA',
  success: '#2E7D32',
  warning: '#ED6C02',
  warningSoft: '#FFF4E5',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const shadow = {
  shadowColor: '#0B1F33',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};

export const typography = {
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, color: colors.textMuted },
  body: { fontSize: 15, color: colors.text },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  caption: { fontSize: 13, color: colors.textMuted },
};
