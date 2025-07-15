use crate::db::{
  models::{Skill, SkillCategories, SkillTagMap, SkillTags},
  skills,
};
use tauri::State;

/// スキル全件取得.
#[tauri::command]
pub async fn fetch_all_skills_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<Skill>, String> {
  skills::fetch_all_skills(&pool).await.map_err(|e| e.to_string())
}

/// 指定したskill_idのスキル取得.
#[tauri::command]
pub async fn fetch_skill_by_id_command(pool: State<'_, sqlx::PgPool>, id: String) -> Result<Option<Skill>, String> {
  skills::fetch_skill_by_id(&pool, &id).await.map_err(|e| e.to_string())
}

/// スキルカテゴリ全件取得.
#[tauri::command]
pub async fn fetch_all_skill_categories_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<SkillCategories>, String> {
  skills::fetch_all_skill_categories(&pool).await.map_err(|e| e.to_string())
}

/// 指定したidのスキルカテゴリを取得.
#[tauri::command]
pub async fn fetch_skill_category_by_id_command(pool: State<'_, sqlx::PgPool>, id: String) -> Result<Option<SkillCategories>, String> {
  skills::fetch_skill_category_by_id(&pool, &id).await.map_err(|e| e.to_string())
}

/// スキルタグ全件取得.
#[tauri::command]
pub async fn fetch_all_skill_tags_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<SkillTags>, String> {
  skills::fetch_all_skill_tags(&pool).await.map_err(|e| e.to_string())
}

/// 指定したidのスキルタグを取得する.
#[tauri::command]
pub async fn fetch_skill_tag_by_id_command(pool: State<'_, sqlx::PgPool>, id: String) -> Result<Option<SkillTags>, String> {
  skills::fetch_skill_tag_by_id(&pool, &id).await.map_err(|e| e.to_string())
}

/// スキルタグマップ全件取得.
#[tauri::command]
pub async fn fetch_all_skill_tag_maps_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<SkillTagMap>, String> {
  skills::fetch_all_skill_tag_maps(&pool).await.map_err(|e| e.to_string())
}

/// 指定したskill_idのスキルタグマップを取得.
#[tauri::command]
pub async fn fetch_skill_tag_maps_by_skill_id_command(pool: State<'_, sqlx::PgPool>, skill_id: String) -> Result<Vec<SkillTagMap>, String> {
  skills::fetch_skill_tag_maps_by_skill_id(&pool, &skill_id).await.map_err(|e| e.to_string())
}

/// 指定したtag_idのスキルタグマップを取得.
#[tauri::command]
pub async fn fetch_skill_tag_maps_by_tag_id_command(pool: State<'_, sqlx::PgPool>, tag_id: String) -> Result<Vec<SkillTagMap>, String> {
  skills::fetch_skill_tag_maps_by_tag_id(&pool, &tag_id).await.map_err(|e| e.to_string())
}
