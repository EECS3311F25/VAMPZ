/**
 * Centralized Design Tokens and Theme Configuration
 *
 * This file contains all reusable design values to ensure consistency
 * across the application and make theming easier to maintain.
 */

// Color Palette
export const COLORS = {
    // Primary colors
    primary: 'teal-600',
    primaryLight: 'teal-400',
    primaryDark: 'teal-700',

    // Secondary colors
    secondary: 'blue-600',
    secondaryLight: 'blue-400',
    secondaryDark: 'blue-700',

    // Status colors
    success: 'emerald-600',
    successLight: 'emerald-400',
    danger: 'red-600',
    dangerLight: 'red-400',
    warning: 'yellow-600',
    warningLight: 'yellow-400',

    // Neutral colors
    slate: {
        50: 'slate-50',
        100: 'slate-100',
        200: 'slate-200',
        400: 'slate-400',
        500: 'slate-500',
        600: 'slate-600',
        700: 'slate-700',
        800: 'slate-800',
        900: 'slate-900',
        950: 'slate-950',
    }
};

// Gradient Combinations
export const GRADIENTS = {
    tealBlue: 'from-teal-500/10 to-blue-500/10',
    emeraldTeal: 'from-emerald-500/10 to-teal-500/10',
    blueIndigo: 'from-blue-500/10 to-indigo-500/10',
    purplePink: 'from-purple-500/10 to-pink-500/10',
    redPink: 'from-red-500/10 to-pink-500/10',
};

// Spacing
export const SPACING = {
    cardPadding: 'p-6',
    cardGap: 'gap-6',
    sectionPadding: 'p-6 md:p-8',
    sectionPaddingTop: 'pt-10 md:pt-12',
};

// Border Radius
export const RADIUS = {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    full: 'rounded-full',
};

// Typography
export const TYPOGRAPHY = {
    heading: {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-bold',
        h3: 'text-xl font-bold',
        h4: 'text-lg font-semibold',
    },
    body: {
        large: 'text-base',
        medium: 'text-sm',
        small: 'text-xs',
    },
};

// Shadows
export const SHADOWS = {
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
    primary: 'shadow-teal-600/30',
};

export default {
    COLORS,
    GRADIENTS,
    SPACING,
    RADIUS,
    TYPOGRAPHY,
    SHADOWS,
};