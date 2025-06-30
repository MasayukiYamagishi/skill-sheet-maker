use tauri::command;
use serde::Serialize;

// DBアクセス用のモジュール
// use create::db::repo;

// フロントに返却する統計情報の型
#[derive(Serialize)]
pub struct Stats {
    // 現在の登録ユーザ総数
    pub total_users: i64,
    // 今月のユーザ増減（前月比）
    pub monthly_change: i64,
    // 過去 n ヵ月分の年月とユーザ数のペア
    pub trend: Vec<(String, i64)>,
}

// TODO: 統計情報を集計するためのAPIとかが作れたら実装を再開する。
// 統計情報をまとめて返すTauriコマンド
// #[command(async)]
// pub async fn get_stats() -> Result<Stats, String> {

//     // DBプールを取得
//     let pool = repo::get_db_pool()
//         .map_err(|e| format!("DB プール初期化エラー: {}", e))?;

//     // 必要な集計関数を呼び出す
//     let total_users = repo::user::conut_users(&pool)
//         .await
//         .map_err(|e| format!("ユーザー集計エラー: {}", e))?;
//     let monthly_change = repo::stats::monthly_change(&pool)
//         .await
//         .map_err(|e| format!("月次集計エラー: {}", e))?;
//     let trend = repo::stats::user_trend(&pool, 6)  // 直近6か月分
//         .await
//         .map_err(|e| format!("推移取得エラー: {}", e))?;

//     // JSONシリアライズ可能な型に詰めて返却
//     Ok(Stats {
//         total_users,
//         monthly_change,
//         trend,
//     })
// }
