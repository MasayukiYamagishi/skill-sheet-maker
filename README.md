# skill-sheet-maker

[![Build](https://github.com/MasayukiYamagishi/skill-sheet-maker/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/MasayukiYamagishi/skill-sheet-maker/actions/workflows/build.yml)

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
- daisyUI 5.0.43
- Node v22.14.0
- PostgreSQL 17
- sqlx v0.6
- tokio v1

---

## 環境構築

1. **Node.js依存パッケージのインストール**

```sh
npm install
```

2. **Rustの環境構築**

参考：
[Windows11でRustの環境構築をする【VSCode】](https://qiita.com/y-428/items/4fcad7e73b061d9154f8)

VSCode を使用して開発することを前提としています。
開発をする場合は拡張機能として、以下の２つを導入してください。

- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

3. **Tauri CLIのインストール**

```sh
npm install -g @tauri-apps/cli
```

4. **PostgreSQLのインストール & DBの用意**

参考：
[PostgreSQLをWindowsにインストールするには](https://qiita.com/tom-sato/items/037b8f8cb4b326710f71)

DBeaverなどを使うと作ったデータベースの中身がわかりやすくなって良いです。

参考：
[DBeaver使い方メモ](https://qiita.com/12345/items/48f6856e32fd618ea307)

5. **.envファイルの用意**

データベースのURLなどを記述したファイルをプロジェクトディレクトリ直下に用意してください。

```
APP_VERSION="0.1.0"
APP_PRODUCTION="true"
DATABASE_URL="postgres://ユーザ名:パスワード@localhost:5432/データベース名"
```

6. **データベースのマイグレーション**

```sh
sqlx migrate run
```

を実行することで、現在の最新のDBスキーマがデータベース上に再現されます。
./migrations配下のマイグレーションファイルはいじらないようにしてください。

---

## 起動

以下のコマンドでアプリケーションのローカルでのテスト起動ができます。

```bash
npm run tauri dev
```

怒られた場合は`npm install`をして、パッケージをインストールしてください。

---

## データベース

### データベースの構成

本プロジェクトではテスト環境用のusers_testと本番環境用のusers_prodという２つのDBを用意しています。

テーブルの構成は`schema.sql`をドキュメンテーション用途で残してあるので、そちらをご覧ください。

データベースの内容をまっさらにした場合、以下の順番でデータを流し込む必要があります。

1. user
2. skill_categories
3. skill_tags
4. skills, qualifications（順不同）
5. career_histories
6. user_skills & user_qualifications
7. career_skills & career_process

`psql`コマンドを使ってデータを流し込む場合、上記5,6,7番目の手順ではデータベースの中身を覗いてUUIDで採番されたidの値を確認する必要があるので注意が必要です。

### データベースの更新

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

### Rust命名規則

参考：
[Rust の命名規則](https://qiita.com/shikuno_dev/items/fc2bcdffdc4d3c3bd16b)
