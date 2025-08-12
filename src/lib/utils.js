/**
 * ╭─────────────────────────────────────────────────────────────────╮
 * │                      🎨 Utility Functions                      │
 * │                                                                 │
 * │  Essential utility functions for styling and class name        │
 * │  management throughout the tokenizer application.              │
 * ╰─────────────────────────────────────────────────────────────────╯
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * ═══════════════════════════════════════════════════════════════════
 * 🎯 FUNCTION: cn (className utility)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Purpose: Intelligent class name merging and conflict resolution
 *          for Tailwind CSS applications
 *
 * Features:
 *   • Combines multiple class name sources
 *   • Resolves Tailwind class conflicts automatically
 *   • Handles conditional classes elegantly
 *   • Filters out falsy values
 *
 * How it works:
 *   1. clsx() normalizes and combines all input class names
 *   2. twMerge() intelligently resolves Tailwind conflicts
 *   3. Returns optimized, conflict-free class string
 *
 * Examples:
 *   cn('px-2 py-1', 'px-4')           → 'py-1 px-4'
 *   cn('text-red-500', 'text-blue-500') → 'text-blue-500'
 *   cn('base-class', isActive && 'active') → 'base-class active'
 *
 * @param {...any} inputs - Class names, objects, arrays, or conditionals
 * @returns {string} Optimized class name string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
