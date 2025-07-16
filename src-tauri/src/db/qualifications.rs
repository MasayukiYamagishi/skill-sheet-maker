use crate::db::Qualification;
use sqlx::PgPool;

/**
 * =======================
 * 資格マスタ
 * =======================
 */
/// 全資格を取得する.
pub async fn fetch_all_qualifications(pool: &PgPool) -> Result<Vec<Qualification>, sqlx::Error> {
  sqlx::query_as::<_, Qualification>("SELECT * FROM qualifications").fetch_all(pool).await
}

/// IDで資格を検索する.
pub async fn fetch_qualification_by_id(pool: &PgPool, id: &str) -> Result<Option<Qualification>, sqlx::Error> {
  sqlx::query_as::<_, Qualification>("SELECT * FROM qualifications WHERE id = $1").bind(id).fetch_optional(pool).await
}
