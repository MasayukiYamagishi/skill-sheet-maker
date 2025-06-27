export type Language = {
  name: string; // 言語名 (例: TypeScript, Java)
  version: string; // バージョン (例: 4.x, 8)
};

export type Project = {
  id: string; // プロジェクトの一意なID
  period: string; // 参画期間 (例: 2022年4月 - 2023年3月)
  title: string; // プロジェクト名/案件名
  team_size: number; // チーム規模 (人数)
  server: string; // サーバー環境 (例: AWS EC2, Firebase)
  os: string; // OS (例: Linux, macOS)
  db: string; // データベース (例: PostgreSQL, Firestore)
  network: string; // ネットワーク (例: VPC, HTTPS)
  package: string; // パッケージ管理ツール (例: npm, yarn)
  tools: string; // 使用ツール (例: VS Code, Docker)
  languages: Language[]; // 使用言語とバージョン
  phases: string[]; // 担当工程 (例: 要件定義, 設計, 実装)
  role: string; // 役割 (例: フロントエンドエンジニア, フルスタックエンジニア)
  scale: string; // 規模 (例: 10人月)
  details: string; // 業務内容、成果物などの詳細
};

export type User = {
  id: string; // ユーザーの一意なID
  name: string; // イニシャルまたはフルネーム
  affiliation: string; // 所属
  age: number; // 年齢
  gender: string; // 性別 (男, 女, 回答しない)
  qualification: string; // 資格 (例: 基本情報技術者)
  education: string; // 最終学歴
  work_term: string; // 稼働 (現職年数等)
  station: string; // 最寄り駅
  speciality: string; // 得意分野
  strong_skills: string; // 得意技術
  pr: string; // 自己PR
  projects: Project[]; // プロジェクト経歴
  company_logo?: string; // 会社ロゴ (Base64文字列、オプション)
};

export type SkillSheetData = {
  users: User[]; // ユーザーデータの配列
  company_logo?: string; // 会社ロゴ (Base64文字列、オプション)
};
