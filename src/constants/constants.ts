export const GenderConst = {
  male: '男',
  female: '女',
  other: 'その他',
} as const;

export const UserStatusConst = {
  inProject: '案件参画中',
  available: '営業中',
  onLeave: '休職中',
  retired: '離職済み',
} as const;

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link';
