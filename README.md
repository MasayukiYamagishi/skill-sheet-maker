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

## データベース

### データベースの初期化について

本プロジェクトでは、データベースとして SQLite を使用しています。`users.db` は各開発者ごとに生成するデータファイルであり、リポジトリには含まれていません（`.gitignore`に登録済みです）。

リポジトリをpullしてきた後、以下のコマンドを実行することで、users.dbを作成できます。

```bash
node db/init_db.js
```

package.jsonにコマンドを登録しているので、次のコマンドでも`init-db.js`を実行できます。

```bash
npm run init-db
```

コマンドを実行することで動かすファイル：**init_db.js** と **schema.sql**

→ `./db` ディレクトリ内に配置されています。

実行することで以下のファイルが生成されます。

- **users.db**：プロジェクト直下に生成されます。

### データベーススキーマの更新手順

以下の手順で、新しいテーブル追加やカラム変更などのスキーマ更新を行います。SQLiteとSQLxを利用したマイグレーション機能を使います。

1. **環境変数を確認**  
   プロジェクトルート（`Cargo.toml` と同じ階層）にある `.env` に、データベース接続先が正しく書かれているかを確認します。

   ```dotenv
   # 例: SQLite ファイルをルート直下の users.db に置く
   DATABASE_URL="sqlite://./users.db"
   ```

2. **新しいマイグレーションファイルを作成**
   Tauri 側ディレクトリ（通常は src-tauri/）に移動して、マイグレーションファイルを追加します。

   ```bash
   cd src-tauri
   sqlx migrate add <YYYYMMDDHHMMSS>\_説明的な名前
   ```

   すると migrations/ 配下にタイムスタンプ付きフォルダが作成され、その中に up.sql／down.sql が空ファイルで置かれます。

3. **`up.sql`／`down.sql`を編集**

   `up.sql`に「適用時」の SQL（例：ALTER TABLE users ADD COLUMN new_col TEXT;）を記述する。

   down.sql に「ロールバック時」の SQL（例：`ALTER TABLE users DROP COLUMN new_col;` など）を記述

4. **マイグレーションを実行**
   `up.sql`をすべて適用して、実際の `users.db`を更新します。

   ```bash
   sqlx migrate run
   ```

   正常に終わると `__sqlx_migrations`テーブルに新しいバージョンが記録されます。

5. **（オフラインマクロ利用時のみ）クエリチェックデータの再生成**
   SQLx のマクロ（query! や query_as!）をオフラインモードで使っている場合、マイグレーション後にデータベーススキーマの参照ファイルを更新します。

```bash
# プロジェクトルートで
SQLX_OFFLINE=1 cargo sqlx prepare -- --lib
```

6. **アプリケーションの再ビルド・再起動**

   - Rust 側を再ビルド（`cd src-tauri && cargo build`）
   - フロントエンド＆Tauri を再起動（`npm run tauri dev` など）

7. **ロールバック（必要な場合のみ）**
   ひとつ前のマイグレーションまで戻したいとき：

   ```bash
   sqlx migrate revert
   ```

   特定ステップ分だけ戻す場合：

   ```bash
   sqlx migrate revert --rev <ステップ数>
   ```

> 💡**Tips**
> マイグレーションファイルは必ず Git 管理下に置き、**schema.sql ではなく migrations/ フォルダ内の up.sql を編集してください。**
>
> こうすることで、誰でも同じ手順でローカル DB を再現できます。

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
