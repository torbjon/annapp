// Anna App Theme - Design tokens matching the web app
export const colors = {
  // Primary colors
  primary: '#363939',
  primaryForeground: '#FFFFFF',
  
  // Anna brand
  annaYellow: '#FFB91F',
  annaGold: '#FBBC05',
  
  // Background & Surface
  background: '#FFFFFF',
  secondary: '#F3F4F6',
  card: '#FFFFFF',
  surface: '#F9FAFB',
  
  // Text colors
  foreground: '#111827',
  mutedForeground: '#6B7280',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#D8DADC',
  borderMuted: '#D1D5DB',
  
  // Status colors
  destructive: '#EF4444',
  success: '#22C55E',
  
  // Specific UI colors
  iconMuted: '#4B5563',
  iconLight: '#9CA3AF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 28,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
