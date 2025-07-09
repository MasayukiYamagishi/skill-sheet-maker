\encoding UTF8;
-- career_histories
INSERT INTO career_histories (user_id, title, started_at, ended_at, description, role, scale)
VALUES
  ('898b4727-372b-4d99-982a-6099e3cb4b8f', '画像認識AI開発プロジェクト', '2018-01-01', '2020-03-31', '画像分類AIの開発および運用。深層学習フレームワークを用いた画像解析モデルの実装・精度改善。', 'AIエンジニア／リーダー', '10名（国内外連携）'),
  ('898b4727-372b-4d99-982a-6099e3cb4b8f', '自然言語処理システム構築', '2020-04-01', '2022-08-31', '大規模テキストデータの解析・自動要約AIの設計。BERTベースのカスタムモデル開発および評価。', 'リードNLPエンジニア', '7名')
ON CONFLICT DO NOTHING;
