/**
 * GitQuest Security & Authentication Utility
 * Provides defensive input sanitization, XSS protection, safe storage, and credential validation.
 */

/**
 * Strips HTML tags and dangerous characters to prevent XSS.
 */
export function sanitizeInput(input: string, maxLength: number = 256): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>'";&`]/g, '') // Strip XSS / injection characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes and validates developer handles / usernames.
 * Only allows alphanumeric characters, underscores, and hyphens.
 */
export function sanitizeUsername(username: string): string {
  if (!username || typeof username !== 'string') return 'ninja_dev';
  const clean = username
    .replace(/[^a-zA-Z0-9_\-]/g, '')
    .trim()
    .slice(0, 30);
  return clean.length >= 2 ? clean : 'ninja_dev';
}

/**
 * Validates email format according to standard structure.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 100;
}

/**
 * Safe local storage wrapper with exception handling, quota defense, and sanitization.
 */
export const safeStorage = {
  getItem(key: string, fallback: string = ''): string {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    try {
      const val = window.localStorage.getItem(key);
      if (val === null) return fallback;
      return sanitizeInput(val, 1024);
    } catch {
      return fallback;
    }
  },

  setItem(key: string, value: string): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    try {
      const cleanVal = sanitizeInput(value, 2048);
      window.localStorage.setItem(key, cleanVal);
      return true;
    } catch {
      console.warn(`[Security] LocalStorage write failed for key: ${key}`);
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  getJSON<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    try {
      const val = window.localStorage.getItem(key);
      if (!val) return fallback;
      const parsed = JSON.parse(val);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch {
      return fallback;
    }
  },

  setJSON<T>(key: string, data: T): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    try {
      const json = JSON.stringify(data);
      window.localStorage.setItem(key, json);
      return true;
    } catch {
      console.warn(`[Security] LocalStorage setJSON failed for key: ${key}`);
      return false;
    }
  },
};
