-- UUIDサポート
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- users（ユーザ情報）
-- ========================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_identifier TEXT NOT NULL UNIQUE,          -- 社員番号
  name TEXT NOT NULL,
  name_kana TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  email TEXT NOT NULL UNIQUE,
  mbti_code TEXT,
  joined_at DATE,
  retired_at DATE,
  final_education TEXT,
  status TEXT NOT NULL CHECK (status IN ('inProject', 'available', 'onLeave', 'retired')),
  affiliation TEXT,
  avatar_path TEXT,
  github_url TEXT,
  pr_text TEXT,
  specialty TEXT,
  tech_strength TEXT,
  sales_comment TEXT,
  toeic_score INTEGER CHECK (toeic_score IS NULL OR (toeic_score % 5 = 0 AND toeic_score >= 0)),
  other_skills TEXT
);

-- ========================
-- qualifications（資格マスタ）
-- ========================
CREATE TABLE qualifications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_national BOOL NOT NULL DEFAULT FALSE
);

-- ========================
-- user_qualifications（ユーザごとの資格）
-- ========================
CREATE TABLE user_qualifications (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  qualification_id INTEGER NOT NULL REFERENCES qualifications(id),
  acquired_at DATE,       -- 資格取得日
  UNIQUE(user_id, qualification_id)
);

-- ========================
-- skills（スキルマスタ）
-- ========================
-- スキルカテゴリ（マスタ）
CREATE TABLE skill_categories (
  id TEXT PRIMARY KEY,          -- "os", "language", ...
  label TEXT NOT NULL,          -- "OS" など日本語ラベル
  description TEXT
);

-- スキルタグ（マスタ）
CREATE TABLE skill_tags (
  id TEXT PRIMARY KEY,          -- "linux", "mobile" など
  label TEXT NOT NULL,
  description TEXT
);


-- スキル本体（マスタ）
CREATE TABLE skills (
  id TEXT PRIMARY KEY,          -- "windows11"など
  label TEXT NOT NULL,          -- "Windows", "Linux"等
  description TEXT,
  devicon_id TEXT,              -- "windows11", "linux"など
  category_id TEXT NOT NULL REFERENCES skill_categories(id)
);

-- スキルのタグ付け（多対多）
CREATE TABLE skill_tag_map (
  skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES skill_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, tag_id)
);

-- ========================
-- user_skills（ユーザごとのスキル）
-- ========================
CREATE TABLE user_skills (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL REFERENCES skills(id),
  version TEXT,         -- 任意入力
  UNIQUE(user_id, skill_id)
);

-- ========================
-- career_histories（経歴）
-- ========================
CREATE TABLE career_histories (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,         -- 経歴タイトル
  started_at DATE,
  ended_at DATE,
  description TEXT,            -- 業務内容
  role TEXT,                   -- 役割
  scale TEXT                   -- 規模
);

-- ========================
-- career_skills（経歴で使ったスキル/技術）
-- ========================
CREATE TABLE career_skills (
  id SERIAL PRIMARY KEY,
  career_id INTEGER NOT NULL REFERENCES career_histories(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL REFERENCES skills(id),
  version TEXT
);

-- ========================
-- master_processes（担当工程の選択肢マスタ）
-- ========================
CREATE TABLE master_processes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO master_processes (name) VALUES
  ('要件定義'), ('基本設計'), ('詳細設計'), ('実装'), ('テスト'), ('保守・運用');

-- ========================
-- career_processes（経歴ごとの担当工程）
-- ========================
CREATE TABLE career_processes (
  id SERIAL PRIMARY KEY,
  career_id INTEGER NOT NULL REFERENCES career_histories(id) ON DELETE CASCADE,
  process_id INTEGER NOT NULL REFERENCES master_processes(id)
);

-- ========================
-- インデックス・ユニーク制約
-- ========================
CREATE UNIQUE INDEX ON user_skills (user_id, skill_id);
CREATE UNIQUE INDEX ON user_qualifications (user_id, qualification_id);

