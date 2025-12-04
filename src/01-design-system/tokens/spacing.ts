/**
 * DHi Student Dashboard - Spacing Tokens
 * 
 * Consistent spacing scale based on 4px base unit.
 */

export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// Common spacing patterns
export const spacingPatterns = {
  // Card padding
  cardPadding: {
    compact: spacing[4],    // 16px
    default: spacing[6],    // 24px
    large: spacing[8],      // 32px
  },

  // Gaps between elements
  gap: {
    tight: spacing[2],      // 8px
    default: spacing[4],    // 16px
    loose: spacing[6],      // 24px
  },

  // Section spacing
  section: {
    small: spacing[8],      // 32px
    default: spacing[12],   // 48px
    large: spacing[16],     // 64px
  },
} as const;
