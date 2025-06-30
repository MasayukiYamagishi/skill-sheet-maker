import sqlite3 from "sqlite3";
import { promises as fs } from "fs"; // fs の非同期APIを利用する場合

const dbFile = "users.db";
const schemaFile = "./db/schema.sql";

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("データベース接続エラー:", err.message);
    process.exit(1);
  }
  console.log("データベースに接続しました。");
});

fs.readFile(schemaFile, "utf8")
  .then((data) => {
    db.exec(data, (err) => {
      if (err) {
        console.error("スキーマの実行に失敗しました:", err);
      } else {
        console.log("スキーマの実行に成功しました。");
      }
      db.close((err) => {
        if (err) {
          console.error("データベースのクローズに失敗しました:", err.message);
        } else {
          console.log("データベースの接続を閉じました。");
        }
      });
    });
  })
  .catch((err) => {
    console.error("スキーマファイルの読み込みに失敗しました:", err);
    db.close((err) => {
      if (err) {
        console.error("データベースのクローズに失敗しました:", err.message);
      }
      process.exit(1);
    });
  });
