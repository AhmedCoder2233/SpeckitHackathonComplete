// frontend/src/utils/editedContentManager.ts

const EDITED_PAGES_PREFIX = 'editedPages_';

// Helper function to check if we're in the browser
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
};

export const getEditedContent = (userId: string | null, pageId: string): string | null => {
  if (!isBrowser() || !userId) return null;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  return localStorage.getItem(key);
};

export const saveEditedContent = (userId: string | null, pageId: string, content: string) => {
  if (!isBrowser() || !userId) return;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  localStorage.setItem(key, content);
};

export const deleteEditedContent = (userId: string | null, pageId: string) => {
  if (!isBrowser() || !userId) return;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  localStorage.removeItem(key);
};