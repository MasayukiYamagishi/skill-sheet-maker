# スキルシート自動生成アプリ

## 概要

このプロジェクトは、スキルシートを自動生成するためのシングルページアプリケーション（SPA）です。初期 PoC（概念実証）として、以下の要件に基づいて開発されています。

## 特徴

- **フロントエンド SPA**: React、TypeScript、TailwindCSS を使用して構築されています。
- **データ管理**: ローカルの JSON ファイルでデータを保存および読み込みます。
- **PDF 出力**: ひな型レイアウトを完全に再現し、A4 サイズで会社ロゴ画像を反映した PDF を生成します。
- **Excel 出力**: SheetJS を利用し、PDF レイアウトを可能な限り再現した Excel ファイルを生成します。
- **一括 ZIP 出力**: 複数のスキルシートを一括で ZIP ファイルとして出力します。
- **バックエンドレス**: アプリケーションはローカルで完結し、バックエンドを必要としません。Web 化の際は Vercel への即時デプロイに対応可能です。

## 技術スタック

- **フレームワーク**: React
- **言語**: TypeScript
- **CSS フレームワーク**: TailwindCSS
- **PDF 生成**: `@react-pdf/renderer`
- **Excel 生成**: `sheetjs`
- **ZIP 圧縮**: `jszip`
- **アイコン**: `react-icons` (Devicon を含む)
- **ファイルダウンロード**: `file-saver`
- **ルーティング**: `react-router-dom`

## データ構造

ユーザーデータは以下の JSON 形式を参考にしています。

```json
{
  "users": [
    {
      "id": "uuid",
      "name": "イニシャルまたはフルネーム",
      "affiliation": "所属",
      "age": 29,
      "gender": "男/女/回答しない",
      "qualification": "例: 基本情報技術者",
      "education": "最終学歴",
      "work_term": "稼働(現職年数等)",
      "station": "最寄り駅",
      "speciality": "得意分野",
      "strong_skills": "得意技術",
      "pr": "自己PR",
      "projects": [
        {
          "id": "uuid",
          "period": "2020年4月 - 2020年10月",
          "title": "プロジェクト名/案件名",
          "team_size": 6,
          "server": "Mac",
          "os": "macOS",
          "db": "SQLite",
          "network": "-",
          "package": "-",
          "tools": "Xcode 11, Android Studio",
          "languages": [
            { "name": "Swift", "version": "5" },
            { "name": "Java", "version": "8" }
          ],
          "phases": [ "要件定義", "基本設計", "実装・単体", ... ],
          "role": "リーダー/メンバー等",
          "scale": "例:10人月",
          "details": "業務内容、成果物などの詳細(自由記述、複数行)"
        }
      ]
    }
  ],
  "company_logo": "Base64String"
}
```

## 主要機能

### トップ画面

- 新規スキルシート作成 / JSON 読込
- ユーザー一覧 / 検索 / 選択

### 編集画面

- 基本情報入力 (必須・任意項目あり)
- プロジェクト経歴の追加・編集 (開発環境、担当工程、技術名/バージョン入力、Devicon 表示対応)
- 会社ロゴ画像のアップロード
- 編集内容のローカル保存 (ドラフト機能は必須ではないが実装容易)

### プレビュー / 出力画面

- PDF プレビュー (印刷イメージそのまま表示)
- PDF 出力 (ロゴ・項目順・工程表示含む)
- Excel 出力
- 一括 PDF 出力 + ZIP ダウンロード (複数人分選択して DL)

## 開発環境のセットアップ

1. プロジェクトのクローン:
   ```bash
   git clone [リポジトリのURL]
   cd skill-sheet-maker
   ```
2. 依存関係のインストール:
   ```bash
   npm install
   ```
3. 開発サーバーの起動:
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:5173` (または表示される URL) にアクセスしてください。

## ビルド

本番環境用にビルドするには、以下のコマンドを実行します。

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに生成されます。
