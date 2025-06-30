import { GenderConst, UserStatusConst } from '@/constants/constants';
import { MbtiCodeConst, MbtiDataConst, MbtiIdentityConst } from '@/constants/mbtiDetails';
import { QualificationOptions } from '@/constants/qualifications';
import { toastKindMap } from '@/constants/toast';

/**
 * ============
 * ユーザー情報関連
 * ============
 */

/** システム上の基本情報. */
export type BaseEntity = {
  /** UUID. */
  uuid: string;
  /** 作成日. */
  createdAt: Date;
  /** 更新日. */
  updatedAt: Date;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

/** 名前. */
export type Name = {
  /** 名前. */
  firstName: string;
  /** 苗字. */
  lastName: string;
  /** 名前カナ. */
  firstNameKana: string;
  /** 苗字カナ. */
  lastNameKana: string;
};

/** 性別. */
export type Gender = (typeof GenderConst)[keyof typeof GenderConst];

/** MBTIのINTP, ENFJなどのコード型. */
export type MbtiCode = (typeof MbtiCodeConst)[keyof typeof MbtiCodeConst];

/** MBTIのAかTかを示すアイデンティティの型. */
export type MbtiIdentity = (typeof MbtiIdentityConst)[keyof typeof MbtiIdentityConst];

/** MBTIのcodeとIdentityに紐づいた詳細データの型. */
export type MbtiDetails = (typeof MbtiDataConst)[MbtiCode];

/** MBTI. */
export type Mbti = {
  code: MbtiCode;
  identity: MbtiIdentity;
};

/** ユーザステータス. */
export type UserStatus = (typeof UserStatusConst)[keyof typeof UserStatusConst];

/** 資格情報. */
export type Qualification = (typeof QualificationOptions)[number];

/** 経歴. */
export type Experience = {
  /** 経歴の年月日. */
  date: Date;
  /** 経歴. */
  label: string;
};

/** ソーシャルリンク. */
export type SocialLinks = {
  /** GitHub. */
  github?: string;
  /** LinkedIn. */
  linkedin?: string;
  /** Facebook. */
  facebook?: string;
  /** X（旧Twitter）. */
  x?: string;
  /** note. */
  note?: string;
  /** Qiita. */
  qiita?: string;
  /** Zenn. */
  zenn?: string;
};

/** スキル. */
export type Skill = {
  /** スキルID. */
  id: string;
  /** スキルのラベル. */
  label: string;
  /** スキルのタグ. */
  tags: string[];
};

/** スキルカテゴリ. */
export type SkillCategory = {
  /** カテゴリのID. */
  categoryId: string;
  /** カテゴリのラベル. */
  label: string;
  /** カテゴリに含まれるスキル. */
  children: Skill[];
};

/** スキルレベル. */
export type SkillLevel = {
  skillId: string;
  level: number;
};

/** ユーザ情報. */
export type User = Entity<{
  /** 名前. */
  name: Name;
  /** メールアドレス. */
  email: string;
  /** 性別. */
  gender: Gender;
  /** 年齢. */
  age: number;
  /** 生年月日. */
  birthDate: Date;
  /** プロフィール画像のパス. */
  avatarImagePath: string | undefined;
  /** ステータス. */
  status: UserStatus;
  /** MBTI. */
  mbti: Mbti;
  /** 受講開始日（入社日）. */
  startDate: Date;
  /** 受講終了予定日. */
  endDate: Date | undefined;
  /** 保有している資格のリスト. */
  qualifications: Qualification[];
  /** 学歴・経歴のリスト. */
  experiences: Experience[];
  /** ソーシャルリンク. */
  socialLinks: SocialLinks;
  /** スキルリスト. */
  skills: Skill[];
  /** スキルについての補足情報. */
  skillInfo: string;
}>;

/**
 * ============
 * コンポーネント関連
 * ============
 */

export type ToastKind = keyof typeof toastKindMap;
