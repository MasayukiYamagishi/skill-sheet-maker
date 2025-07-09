-- Add migration script here
DROP TABLE IF EXISTS master_processes CASCADE;

CREATE TABLE master_processes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO master_processes (name) VALUES
  ('要件定義'), ('基本設計'), ('詳細設計'), ('実装'), ('テスト'), ('保守・運用');