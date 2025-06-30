import { SkillCategory } from '@/types/types';

/** スキルのレベルに応じた説明. */
export const SkillLevelDescription = [
  { value: 1, label: '趣味 または 実務１年未満' },
  { value: 2, label: '実務１年以上 または それと同等' },
  { value: 3, label: '実務３年以上 または それと同等' },
  { value: 4, label: '実務５年以上 または それと同等' },
] as const;

/** スキルのタグ. */
export const SkillTag = {
  linux: 'Linux',
  mobile: 'モバイル',
  os: 'OS',
  server: 'サーバ',
} as const;

// TODO: 作りかけ
/**
 * スキル一覧.
 * idはDeviconのnameと対応付けています.
 */
export const Skills: SkillCategory[] = [
  {
    categoryId: 'os',
    label: 'OS',
    children: [
      { id: 'windows11', label: 'Windows', tags: [SkillTag.os] },
      { id: 'linux', label: 'Linux', tags: [SkillTag.os, SkillTag.linux] },
      { id: 'macos', label: 'macOS', tags: [SkillTag.os] },
      { id: 'unix', label: 'UNIX', tags: [SkillTag.os] },
      { id: 'debian', label: 'Debian', tags: [SkillTag.os, SkillTag.linux] },
      { id: 'msdos', label: 'MS-DOS', tags: [SkillTag.os] },
      { id: 'nixos', label: 'NixOS', tags: [SkillTag.os] },
      { id: 'rockylinux', label: 'Rocky Linux', tags: [SkillTag.os, SkillTag.linux] },
      { id: 'ubuntu', label: 'Ubuntu', tags: [SkillTag.os, SkillTag.linux] },
      { id: 'yunohost', label: 'YunoHost', tags: [SkillTag.os] },
      { id: 'android', label: 'Android', tags: [SkillTag.os, SkillTag.mobile] },
      { id: 'ios', label: 'iOS', tags: [SkillTag.os, SkillTag.mobile] },
    ],
  },
  {
    categoryId: 'database',
    label: 'データベース管理',
    children: [
      { id: 'azuresqldatabase', label: 'PostgreSQL', tags: [] },
      { id: 'skill_postgresql', label: 'PostgreSQL', tags: [] },
      { id: 'skill_mysql', label: 'MySQL', tags: [] },
      { id: 'skill_sqlite', label: 'SQLite', tags: [] },
      { id: 'skill_mongodb', label: 'MongoDB', tags: [] },
      { id: 'skill_mongodb', label: 'Oracle', tags: [] },
      { id: 'skill_redis', label: 'Redis', tags: [] },
      { id: 'skill_dynamodb', label: 'DynamoDB', tags: [] },
      { id: 'skill_elasticsearch', label: 'Elasticsearch', tags: [] },
      { id: 'skill_kibana', label: 'Kibana', tags: [] },
      { id: 'skill_prisma', label: 'Prisma', tags: [] },
      { id: 'skill_typeorm', label: 'TypeORM', tags: [] },
      { id: 'skill_sequelize', label: 'Sequelize', tags: [] },
      { id: 'skill_sql', label: 'SQL', tags: [] },
      { id: 'skill_sql', label: 'BigQuery', tags: [] },
    ],
  },
  {
    categoryId: 'language',
    label: 'プログラミング言語',
    children: [
      { id: 'skill_javascript', label: 'JavaScript', tags: [] },
      { id: 'skill_typescript', label: 'TypeScript', tags: [] },
      { id: 'skill_python', label: 'Python', tags: [] },
      { id: 'skill_java', label: 'Java', tags: [] },
      { id: 'skill_csharp', label: 'C#', tags: [] },
      { id: 'skill_go', label: 'Go', tags: [] },
      { id: 'skill_php', label: 'PHP', tags: [] },
      { id: 'skill_ruby', label: 'Ruby', tags: [] },
      { id: 'skill_kotlin', label: 'Kotlin', tags: [] },
      { id: 'skill_swift', label: 'Swift', tags: [] },
      { id: 'skill_cpp', label: 'C++', tags: [] },
      { id: 'skill_c', label: 'C', tags: [] },
      { id: 'skill_rust', label: 'Rust', tags: [] },
      { id: 'skill_scala', label: 'Scala', tags: [] },
      { id: 'skill_perl', label: 'Perl', tags: [] },
      { id: 'skill_cobol', label: 'COBOL', tags: [] },
      { id: 'skill_r', label: 'R', tags: [] },
      { id: 'skill_dart', label: 'dart', tags: [] },
    ],
  },
  {
    categoryId: 'framework',
    label: 'フレームワーク・ライブラリ',
    children: [
      { id: 'skill_react', label: 'React', tags: [] },
      { id: 'skill_vue', label: 'Vue.js', tags: [] },
      { id: 'skill_angular', label: 'Angular', tags: [] },
      { id: 'skill_svelte', label: 'Svelte', tags: [] },
      { id: 'skill_nextjs', label: 'Next.js', tags: [] },
      { id: 'skill_nestjs', label: 'NestJS', tags: [] },
      { id: 'skill_express', label: 'Express', tags: [] },
      { id: 'skill_django', label: 'Django', tags: [] },
      { id: 'skill_flask', label: 'Flask', tags: [] },
      { id: 'skill_spring', label: 'Spring', tags: [] },
      { id: 'skill_laravel', label: 'Laravel', tags: [] },
      { id: 'skill_rails', label: 'Ruby on Rails', tags: [] },
      { id: 'skill_mui', label: 'Material-UI', tags: [] },
      { id: 'skill_tailwind', label: 'Tailwind CSS', tags: [] },
      { id: 'skill_storybook', label: 'Storybook', tags: [] },
      { id: 'skill_skill_vite', label: 'Vite', tags: [] },
      { id: 'skill_pytorch', label: 'PyTorch', tags: [] },
      { id: 'skill_tensorflow', label: 'TensorFlow', tags: [] },
      { id: 'skill_scikitlearn', label: 'scikit-learn', tags: [] },
    ],
  },
  {
    categoryId: 'tool',
    label: 'ビジネスツール・開発環境',
    children: [],
  },
  {
    categoryId: 'design',
    label: 'デザイン',
    children: [],
  },
  {
    categoryId: 'network',
    label: 'ネットワーク',
    children: [],
  },
  {
    categoryId: 'cloud',
    label: 'クラウド',
    children: [],
  },
  {
    categoryId: 'development',
    label: '開発工程・開発手法',
    children: [],
  },
  {
    categoryId: 'cicd',
    label: 'CI/CD',
    children: [],
  },
  {
    categoryId: 'security',
    label: 'セキュリティ',
    children: [],
  },
  {
    categoryId: 'ai',
    label: 'AI',
    children: [],
  },
  {
    categoryId: 'datascience',
    label: 'データサイエンス',
    children: [],
  },
  {
    categoryId: 'softskill',
    label: 'ソフトスキル',
    children: [],
  },
] as const;
