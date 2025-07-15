use crate::db::{Skill, SkillCategories, SkillTagMap, SkillTags};
use sqlx::PgPool;

/**
 * =======================
 * スキルマスタ
 * =======================
 */
/// 全スキルを取得する.
pub async fn fetch_all_skills(pool: &PgPool) -> Result<Vec<Skill>, sqlx::Error> {
  sqlx::query_as::<_, Skill>("SELECT * FROM skills").fetch_all(pool).await
}

/// IDでスキルを検索する.
pub async fn fetch_skill_by_id(pool: &PgPool, id: &str) -> Result<Option<Skill>, sqlx::Error> {
  sqlx::query_as::<_, Skill>("SELECT * FROM skills WHERE id = $1").bind(id).fetch_optional(pool).await
}

/**
 * =======================
 * スキルカテゴリマスタ
 * =======================
 */
/// 全スキルカテゴリを取得する.
pub async fn fetch_all_skill_categories(pool: &PgPool) -> Result<Vec<SkillCategories>, sqlx::Error> {
  sqlx::query_as::<_, SkillCategories>("SELECT * FROM skill_categories").fetch_all(pool).await
}

/// IDでスキルカテゴリを検索する.
pub async fn fetch_skill_category_by_id(pool: &PgPool, id: &str) -> Result<Option<SkillCategories>, sqlx::Error> {
  sqlx::query_as::<_, SkillCategories>("SELECT * FROM skill_categories WHERE id = $1").bind(id).fetch_optional(pool).await
}

/**
 * =======================
 * スキルタグマスタ
 * =======================
 */
/// 全スキルタグを取得する.
pub async fn fetch_all_skill_tags(pool: &PgPool) -> Result<Vec<SkillTags>, sqlx::Error> {
  sqlx::query_as::<_, SkillTags>("SELECT * FROM skill_tags").fetch_all(pool).await
}

/// IDでスキルタグを検索する.
pub async fn fetch_skill_tag_by_id(pool: &PgPool, id: &str) -> Result<Option<SkillTags>, sqlx::Error> {
  sqlx::query_as::<_, SkillTags>("SELECT * FROM skill_tags WHERE id = $1").bind(id).fetch_optional(pool).await
}

/**
 * =======================
 * スキルタグマップ
 * =======================
 */
/// 全スキルタグマップを取得する.
pub async fn fetch_all_skill_tag_maps(pool: &PgPool) -> Result<Vec<SkillTagMap>, sqlx::Error> {
  sqlx::query_as::<_, SkillTagMap>("SELECT * FROM skill_tag_map").fetch_all(pool).await
}

/// スキルIDでスキルタグマップを検索する.
pub async fn fetch_skill_tag_maps_by_skill_id(pool: &PgPool, skill_id: &str) -> Result<Vec<SkillTagMap>, sqlx::Error> {
  sqlx::query_as::<_, SkillTagMap>("SELECT * FROM skill_tag_map WHERE skill_id = $1").bind(skill_id).fetch_all(pool).await
}

/// タグIDでスキルタグマップを検索する.
pub async fn fetch_skill_tag_maps_by_tag_id(pool: &PgPool, tag_id: &str) -> Result<Vec<SkillTagMap>, sqlx::Error> {
  sqlx::query_as::<_, SkillTagMap>("SELECT * FROM skill_tag_map WHERE tag_id = $1").bind(tag_id).fetch_all(pool).await
}
