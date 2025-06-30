import type { User } from '@/types/types';
import { GenderConst } from '@/constants/constants';
import { MbtiCodeConst, MbtiIdentityConst } from '@/constants/mbtiDetails';
import { SkillOptions } from '@/constants/skills';
import { QualificationOptions } from '@/constants/qualifications';

/**
 * サンプルユーザー一覧
 */
export const sampleUsers: User[] = [
  {
    // BaseEntity
    uuid: 'a1b2c3d4-e5f6-7a8b-9c0d-1234567890ab',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-06-01T12:00:00Z'),

    // Profile
    name: {
      firstName: '太郎',
      lastName: '山田',
      firstNameKana: 'タロウ',
      lastNameKana: 'ヤマダ',
    },
    email: 'taro.yamada@example.com',
    gender: GenderConst.male,
    age: 28,
    birthDate: new Date('1996-07-15'),
    avatarImagePath: './src/test/ali-morshedlou-WMD64tMfc4k-unsplash.jpg',

    // MBTI
    mbti: {
      code: MbtiCodeConst.intp,
      identity: MbtiIdentityConst.turbulent,
    },

    // TrainingStatus (start/end only)
    startDate: new Date('2024-04-01'),
    endDate: undefined,

    // Qualifications
    qualifications: [QualificationOptions.find((q) => q.id === 'q_itpassport')!],

    // Experiences
    experiences: [
      {
        date: new Date('2019-04-01'),
        label: 'ABC株式会社 - 開発エンジニア',
      },
    ],

    // Social Links
    socialLinks: {
      github: 'https://github.com/taro-y',
      zenn: 'https://zenn.dev/taro-y',
    },

    // Skills
    skills: [
      // {
      //   skillId: SkillOptions.find((s) => s.id === 'skill_typescript')!.id,
      //   level: 4,
      // },
      // {
      //   skillId: SkillOptions.find((s) => s.id === 'skill_react')!.id,
      //   level: 3,
      // },
      // { customName: 'GraphQL', level: 2 },
    ],
    skillInfo: 'フロントエンド開発を中心に、GraphQLなどのAPI設計経験があります。',
  },

  {
    // BaseEntity
    uuid: 'f6e5d4c3-b2a1-0f9e-8d7c-6543210987fe',
    createdAt: new Date('2022-03-15T09:30:00Z'),
    updatedAt: new Date('2023-07-10T14:20:00Z'),

    // Profile
    name: {
      firstName: '花子',
      lastName: '鈴木',
      firstNameKana: 'ハナコ',
      lastNameKana: 'スズキ',
    },
    email: 'hanako.suzuki@example.com',
    gender: GenderConst.female,
    age: 32,
    birthDate: new Date('1991-02-20'),
    avatarImagePath: undefined,

    // MBTI
    mbti: {
      code: MbtiCodeConst.infj,
      identity: MbtiIdentityConst.assertive,
    },

    // TrainingStatus (start/end only)
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-03-31'),

    // Qualifications
    qualifications: [
      QualificationOptions.find((q) => q.id === 'q_fe')!,
      QualificationOptions.find((q) => q.id === 'q_ap')!,
    ],

    // Experiences
    experiences: [
      {
        date: new Date('2018-06-01'),
        label: 'XYZ株式会社 入社',
      },
      {
        date: new Date('2022-10-01'),
        label: 'XYZ株式会社 一身上の都合により退職',
      },
    ],

    // Social Links
    socialLinks: {
      linkedin: 'https://linkedin.com/in/hanako-s',
      facebook: 'https://facebook.com/hanako.suzuki',
    },

    // Skills
    skills: [
      // {
      //   skillId: SkillOptions.find((s) => s.id === 'skill_python')!.id,
      //   level: 5,
      // },
      // {
      //   skillId: SkillOptions.find((s) => s.id === 'skill_django')!.id,
      //   level: 4,
      // },
      // { skillId: SkillOptions.find((s) => s.id === 'skill_sql')!.id, level: 4 },
    ],
    skillInfo: 'バックエンドとデータベースを得意とし、Djangoでの開発実績があります。',
  },
];
