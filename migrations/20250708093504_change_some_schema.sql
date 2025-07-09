-- Add migration script here
DROP TABLE IF EXISTS
    user_qualifications, qualifications, career_processes
CASCADE;

-- ========================
-- qualifications（資格マスタ）
-- TEXT型の主キー
-- ========================
CREATE TABLE qualifications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_national BOOL NOT NULL DEFAULT FALSE
);

-- ========================
-- user_qualifications（ユーザごとの資格）
-- 複合PK（user_id, qualification_id）
-- ========================
CREATE TABLE user_qualifications (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  qualification_id TEXT NOT NULL REFERENCES qualifications(id),
  acquired_at DATE,
  PRIMARY KEY (user_id, qualification_id)
);

-- ========================
-- career_processes（経歴ごとの担当工程）
-- 複合PK（career_id, process_id）
-- ========================
CREATE TABLE career_processes (
  career_id UUID NOT NULL REFERENCES career_histories(id) ON DELETE CASCADE,
  process_id INTEGER NOT NULL REFERENCES master_processes(id),
  PRIMARY KEY (career_id, process_id)
);