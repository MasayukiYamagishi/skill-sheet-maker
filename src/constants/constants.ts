import { Gender, ProcessId, SkillCategoryId, UserStatus } from '@/types/types';
import { SkillCategoryConst } from './skills';

/** 性別. */
export const GenderConst = {
  male: '男',
  female: '女',
  other: 'その他',
} as const;

/** ユーザステータス. */
export const UserStatusConst = {
  inProject: '案件参画中',
  available: '営業中',
  onLeave: '休職中',
  retired: '離職済み',
} as const;

/** 担当工程マスタ. */
export const ProcessMasterConst = [
  { id: 1, name: '要件定義' },
  { id: 2, name: '基本設計' },
  { id: 3, name: '詳細設計' },
  { id: 4, name: '実装' },
  { id: 5, name: 'テスト' },
  { id: 6, name: '保守・運用' },
] as const;

// 選択肢リスト（型補助も）
export const GENDER_LIST = Object.keys(GenderConst) as Gender[];
export const USER_STATUS_LIST = Object.keys(UserStatusConst) as UserStatus[];
// SKILL_CATEGORY_LIST, PROCESS_LISTは、マスタ情報から抽出
// SkillCategoryConst（skills.tsで定義している場合）のkeyリスト取得
export const SKILL_CATEGORY_LIST = Object.keys(SkillCategoryConst) as SkillCategoryId[];
// プロセスIDリスト
export const PROCESS_ID_LIST = ProcessMasterConst.map((p) => p.id) as ProcessId[];
// プロセス名リスト
export const PROCESS_NAME_LIST = ProcessMasterConst.map((p) => p.name);
