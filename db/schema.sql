-- ユーザーテーブル
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_identifier TEXT UNIQUE, -- 社員番号やユーザIDとして利用
  name TEXT NOT NULL,
  name_reading TEXT NOT NULL,
  birth_date DATE,
  age INTEGER,
  gender TEXT,
  email TEXT UNIQUE NOT NULL,
  mbti_result TEXT,
  mbti_explanation TEXT,
  enrollment_start_date DATE,
  enrollment_end_date DATE -- 社員の場合はNULL
);

-- 資格（クオリフィケーション）テーブル
CREATE TABLE qualifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  qualification TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 職歴・経歴テーブル
CREATE TABLE career_histories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  career_description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- スキルセットテーブル（スキルとレベルを保持）
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  skill_name TEXT,
  skill_level INTEGER,  -- 数値でレベルを表現（例：1～10）
  FOREIGN KEY (user_id) REFERENCES users(id)
);
