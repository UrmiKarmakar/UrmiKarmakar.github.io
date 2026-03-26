import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Safer check that won't crash during build or testing
export const isIframe = typeof window !== 'undefined' && window.self !== window.top;