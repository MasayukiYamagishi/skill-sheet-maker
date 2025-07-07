# skill-sheet-maker

スキルシートを簡単に作りたいので実装した社員を管理するためのアプリです。

Rust ベースのデスクトップアプリケーションフレームワークである Tauri を使用して作っています。
クロスプラットフォーム対応も視野に入れています。

フロントは TypeScript で、React を使用しています。

## 技術スタック

- Tauri v2
- React 18.3.1
- Vite 6.3.1
- TypeScript
- tailwindcss v4.1
- daisyUI 5.0.35
- SQLite 5.1.7
- Node v22.14.0

## 推奨される IDE 設定

VSCode を使用して開発することを前提としています。

開発をする場合は拡張機能として、以下の２つを導入してください。

- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 起動

以下のコマンドでアプリケーションのローカルでのテスト起動ができます。

```bash
npm run tauri dev
```

怒られた場合は`npm install`をして、パッケージをインストールしてください。

---

## データベースの更新

本プロジェクトでは、**PostgreSQL + sqlx + tokio-postgres**でDBを構築しています。
sqlxを使うことで、DBスキーマの履歴がすべてマイグレーションで管理されています。

データベースのスキーマを更新する流れは次の通りです。

1. `sqlx migrate add <任意の名前>`を実行して、マイグレーションファイルを作成します。
   例： `sqlx migrate add schema_renew`
2. マイグレーションファイルが./migrations配下にできたら、DBのテーブル定義に対して加えたい変更のSQL文を書いていきます。
   マイグレーションファイルはそのまま履歴なので、過去のマイグレーションファイルを変更してはいけません。
3. マイグレーションファイルの内容が完成したら、`.env`ファイルに記述した`DATABASE_URL`の向き先が変更したいDBのリンクになっていることを確認して、`sql migrate run`コマンドを実行します。
4. DBのテーブル定義などがマイグレーションファイルに記述された内容で変更・更新されます。

---

## ファイルの配置

React の実装では、Bulletproof-React のディレクトリ構成を参考にしてファイルの配置を行います。
[React プロジェクトのための新しい道: Bulletproof-React ディレクトリ構造の探求](https://qiita.com/konta74315/items/c91c3b6876cef70bf853)

## 初期化手順

1. **依存パッケージのインストール**  
   プロジェクトのルートディレクトリで以下のコマンドを実行してください。

   ```bash
   npm install
   ```

2. **データベースの初期化**

   リポジトリをクローンしてすぐはデータベースのファイルがないので、以下のコマンドを実行してファイルを生成します。

   ```bash
   node db/init_db.js
   または
   npm run init-db
   ```
