// types.ts

/** ==========================
 *  基本型・共通ユーティリティ
 * ==========================
 */

/** UUID（DB上はuuid型, TSはstringで管理） */
export type UUID = string;
/** SQL日付型（YYYY-MM-DD形式の文字列） */
export type SqlDate = string;
/** タイムスタンプ（ISO8601文字列, 例: "2023-12-01T12:34:56Z"） */
export type SqlTimestamp = string;

/** ==========================
 *   ユニオン型（DB値に対応）
 * ==========================
 */

/** 性別のDB値 */
export type Gender = 'male' | 'female' | 'other';
/** ユーザーステータスのDB値 */
export type UserStatus = 'inProject' | 'available' | 'onLeave' | 'retired';
/** スキルカテゴリID */
export type SkillCategoryId = string; // 例: 'os'
/** スキルタグID */
export type SkillTagId = string; // 例: 'linux'
/** スキルID */
export type SkillId = string; // 例: 'windows11'
/** MBTIコード */
export type MbtiCode = string; // 例: "INTP"
/** 担当工程ID（master_processes） */
export type ProcessId = number; // DBはserial, TSはnumber

/** ==========================
 *   ユーザ情報・本人情報
 * ==========================
 */

export type BaseEntity = {
  uuid: UUID;
  createdAt: SqlTimestamp;
  updatedAt: SqlTimestamp;
};

export type User = BaseEntity & {
  userIdentifier: string;
  name: string;
  nameKana: string;
  birthDate: SqlDate;
  gender: Gender;
  email: string;
  mbtiCode?: MbtiCode;
  joinedAt?: SqlDate;
  retiredAt?: SqlDate;
  finalEducation?: string;
  status: UserStatus;
  affiliation?: string;
  avatarPath?: string;
  githubUrl?: string;
  prText?: string;
  specialty?: string;
  techStrength?: string;
  salesComment?: string;
  toeicScore?: number;
  otherSkills?: string;
};

/** ==========================
 *   資格マスタ/ユーザ資格
 * ==========================
 */

export type Qualification = {
  id: number;
  name: string;
  description?: string;
  isNational: boolean;
};

export type UserQualification = {
  id: number;
  userId: UUID;
  qualificationId: number;
  acquiredAt?: SqlDate;
};

/** ==========================
 *   スキルカテゴリ・タグ・スキル
 * ==========================
 */

/** スキルカテゴリ */
export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  description?: string;
};

/** スキルタグ */
export type SkillTag = {
  id: SkillTagId;
  label: string;
  description?: string;
};

/** スキル本体 */
export type Skill = {
  id: SkillId;
  label: string;
  description?: string;
  deviconId?: string;
  categoryId: SkillCategoryId;
  tags?: SkillTagId[]; // DBからJOIN取得時など
};

/** スキル+タグ情報を一発で返す場合 */
export type SkillWithTags = Skill & {
  tags: SkillTag[];
};

/** ユーザが持つスキル */
export type UserSkill = {
  id: number;
  userId: UUID;
  skillId: SkillId;
  version?: string;
};

/** ==========================
 *   経歴・プロジェクト履歴
 * ==========================
 */

export type CareerHistory = {
  id: number;
  userId: UUID;
  title: string;
  startedAt?: SqlDate;
  endedAt?: SqlDate;
  description?: string;
  role?: string;
  scale?: string;
};

/** 経歴ごとの使用スキル */
export type CareerSkill = {
  id: number;
  careerId: number;
  skillId: SkillId;
  version?: string;
};

/** 経歴ごとの担当工程 */
export type CareerProcess = {
  id: number;
  careerId: number;
  processId: ProcessId;
};

/** ==========================
 *   担当工程マスタ
 * ==========================
 */
export type ProcessMaster = {
  id: ProcessId;
  name: string; // 例: '要件定義'
};

/** ==========================
 *   ソーシャルリンク・その他
 * ==========================
 */

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  facebook?: string;
  x?: string;
  note?: string;
  qiita?: string;
  zenn?: string;
};

/** ==========================
 *   画面/コンポーネント系 (任意)
 * ==========================
 */

// 例: Toast用など
export type ToastKind = 'success' | 'info' | 'error' | 'warning';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link';

/** ==========================
 *   追加：MBTI型など（必要に応じて）
 * ==========================
 */
export type MbtiIdentity = string; // "A" | "T"など
export type Mbti = {
  code: MbtiCode;
  identity: MbtiIdentity;
};

/** ==========================
 *   型補助：一覧取得など
 * ==========================
 */

// スキルカテゴリ一覧
export type SkillCategoryList = SkillCategory[];
// タグ一覧
export type SkillTagList = SkillTag[];
// スキル一覧
export type SkillList = Skill[];
// 資格一覧
export type QualificationList = Qualification[];
