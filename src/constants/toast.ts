import { ToastKind } from '@/types/types';

/**
 * トーストの種類.
 */
export const toastKindMap = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

/**
 * トーストの種類に対応した色.
 */
export const toastColorMap: Record<ToastKind, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
} as const;
