const fs = require('fs');
const path = require('path');

// ファイルパスの設定
const qualificationJsonPath = path.join(
  __dirname,
  '..',
  'public',
  'reference',
  'qualifications',
  'qualifications.json',
);
const outputSqlPath = path.join(__dirname, '..', 'sql', 'insert_qualifications.sql');

// JSONファイルを読み込み
const qualifications = JSON.parse(fs.readFileSync(qualificationJsonPath, 'utf-8'));

// SQL生成関数
function escape(str) {
  if (!str) return '';
  return str.replace(/'/g, "''").replace(/\n/g, '\\n');
}

// 1行目でエンコーディング指定（Postgres推奨）
let sql = `\\encoding UTF8;\n-- qualifications\n`;

for (const q of qualifications) {
  sql += `INSERT INTO qualifications (name, description, is_national) VALUES ('${escape(q.name)}', '${escape(q.description)}', ${q.is_national}) ON CONFLICT (name) DO NOTHING;\n`;
}

// 書き出し
fs.writeFileSync(outputSqlPath, sql);
console.log('insert_qualifications.sql generated!');
