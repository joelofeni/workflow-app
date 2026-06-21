"use client";

import { useState, useEffect, useCallback } from "react";

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or private browsing — silently fail
  }
}

/**
 * Generic localStorage hook for simple values.
 * BoardProvider uses getStorageItem/setStorageItem directly for useReducer integration.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    getStorageItem(key, initialValue),
  );

  useEffect(() => {
    setStorageItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
