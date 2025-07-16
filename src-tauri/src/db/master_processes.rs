use crate::db::MasterProcess;
use sqlx::PgPool;

/**
 * =======================
 * 担当工程マスタ
 * =======================
 */
/// 全工程の情報を取得する.
pub async fn fetch_all_processes(pool: &PgPool) -> Result<Vec<MasterProcess>, sqlx::Error> {
  sqlx::query_as::<_, MasterProcess>("SELECT * FROM master_processes").fetch_all(pool).await
}
