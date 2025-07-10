use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

/**
 * ===============
 * ユーザ情報関連.
 * ===============
 */
/// ユーザ情報.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct User {
  pub id: Uuid,
  pub created_at: DateTime<Utc>,
  pub updated_at: DateTime<Utc>,
  pub user_identifier: String,
  pub name: String,
  pub name_kana: String,
  pub birth_date: NaiveDate,
  pub gender: String,
  pub email: String,
  pub mbti_code: Option<String>,
  pub joined_at: Option<NaiveDate>,
  pub retired_at: Option<NaiveDate>,
  pub final_education: Option<String>,
  pub status: String,
  pub affiliation: Option<String>,
  pub avatar_path: Option<String>,
  pub github_url: Option<String>,
  pub pr_text: Option<String>,
  pub specialty: Option<String>,
  pub tech_strength: Option<String>,
  pub sales_comment: Option<String>,
  pub toeic_score: Option<i32>,
  pub other_skills: Option<String>,
}

/// ユーザ情報新規登録用.
/// id, created_at, updated_atはDB側で自動設定されるので不要
#[derive(Debug, Serialize, Deserialize)]
pub struct NewUser {
  pub user_identifier: String,
  pub name: String,
  pub name_kana: String,
  pub birth_date: NaiveDate,
  pub gender: String,
  pub email: String,
  pub mbti_code: Option<String>,
  pub joined_at: Option<NaiveDate>,
  pub retired_at: Option<NaiveDate>,
  pub final_education: Option<String>,
  pub status: String,
  pub affiliation: Option<String>,
  pub avatar_path: Option<String>,
  pub github_url: Option<String>,
  pub pr_text: Option<String>,
  pub specialty: Option<String>,
  pub tech_strength: Option<String>,
  pub sales_comment: Option<String>,
  pub toeic_score: Option<i32>,
  pub other_skills: Option<String>,
}

/// ユーザ情報更新用.
/// PUT/PATCH想定、全フィールドOptionalで部分更新できるようにする.
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUser {
  pub user_identifier: Option<String>,
  pub name: Option<String>,
  pub name_kana: Option<String>,
  pub birth_date: Option<NaiveDate>,
  pub gender: Option<String>,
  pub email: Option<String>,
  pub mbti_code: Option<String>,
  pub joined_at: Option<NaiveDate>,
  pub retired_at: Option<NaiveDate>,
  pub final_education: Option<String>,
  pub status: Option<String>,
  pub affiliation: Option<String>,
  pub avatar_path: Option<String>,
  pub github_url: Option<String>,
  pub pr_text: Option<String>,
  pub specialty: Option<String>,
  pub tech_strength: Option<String>,
  pub sales_comment: Option<String>,
  pub toeic_score: Option<i32>,
  pub other_skills: Option<String>,
}

/**
 * ===============
 * 資格マスタ関連.
 * ===============
 */
/// 資格マスタ.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Qualification {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub is_national: bool,
}

/**
 * ===============
 * スキル情報マスタ関連.
 * ===============
 */
/// スキルカテゴリマスタ.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillCategories {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
}

/// スキルタグマスタ.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillTags {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
}

/// スキルマスタ.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Skill {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
  pub devicon_id: Option<String>,
  pub category_id: String,
}

/// スキルタグ付け.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillTagMap {
  pub skill_id: String,
  pub tag_id: String,
}

/**
 * ===============
 * 担当工程マスタ関連.
 * ===============
 */
/// 担当工程マスタ.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct MasterProcesses {
  pub id: i32,
  pub name: String,
}

/**
 * ===============
 * ユーザごとの資格関連.
 * ===============
 */
/// ユーザ資格.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct UserQualification {
  pub user_id: Uuid,
  pub qualification_id: String,
  pub acquired_at: Option<chrono::NaiveDate>,
}

/// ユーザ資格 新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserQualification {
  pub user_id: Uuid,
  pub qualification_id: String,
  pub acquired_at: Option<chrono::NaiveDate>,
}

/// ユーザ資格 複数新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserQualifications {
  pub qualifications: Vec<NewUserQualification>,
}

/// ユーザ資格 更新用.
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserQualification {
  pub user_id: uuid::Uuid,
  pub qualification_id: String,
  pub acquired_at: Option<chrono::NaiveDate>,
}

/// ユーザ資格 削除用.
#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteUserQualifications {
  pub user_id: Uuid,
  pub qualification_ids: Vec<String>,
}

/**
 * ===============
 * ユーザごとのスキル関連.
 * ===============
 */
/// ユーザごとのスキル.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct UserSkill {
  pub user_id: uuid::Uuid,
  pub skill_id: String,
  pub version: Option<String>,
}

/// ユーザごとのスキル 新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserSkill {
  pub user_id: uuid::Uuid,
  pub skill_id: String,
  pub version: Option<String>,
}

/// ユーザごとのスキル 複数新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserSkills {
  pub skills: Vec<NewUserSkill>,
}

/// ユーザごとのスキル 更新用.
/// スキルのバージョンだけを変更できるようにする
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserSkill {
  pub version: Option<String>,
}

/// ユーザごとのスキル 削除用（複数可）.
#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteUserSkills {
  pub user_id: Uuid,
  pub skill_ids: Vec<String>, // skill_idのリスト
}

/**
 * ===============
 * 経歴関連.
 * ===============
 */
/// 経歴情報取得用.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct CareerHistory {
  pub id: uuid::Uuid,
  pub user_id: uuid::Uuid,
  pub title: String,
  pub started_at: Option<chrono::NaiveDate>,
  pub ended_at: Option<chrono::NaiveDate>,
  pub description: Option<String>,
  pub role: Option<String>,
  pub scale: Option<String>,
}

/// 経歴情報新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerHistory {
  pub user_id: uuid::Uuid,
  pub title: String,
  pub started_at: Option<chrono::NaiveDate>,
  pub ended_at: Option<chrono::NaiveDate>,
  pub description: Option<String>,
  pub role: Option<String>,
  pub scale: Option<String>,
}

/// 経歴情報複数新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerHistories {
  pub histories: Vec<NewCareerHistory>,
}

/// 経歴情報更新用.
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateCareerHistory {
  pub title: Option<String>,
  pub started_at: Option<chrono::NaiveDate>,
  pub ended_at: Option<chrono::NaiveDate>,
  pub description: Option<String>,
  pub role: Option<String>,
  pub scale: Option<String>,
}

/// 経歴情報削除用（複数可）.
#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteCareerHistories {
  pub ids: Vec<Uuid>,
}

/// 経歴に紐づくスキル取得用.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct CareerSkill {
  pub career_id: uuid::Uuid,
  pub skill_id: String,
  pub version: Option<String>,
}

/// 経歴に紐づくスキル新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerSkill {
  pub career_id: uuid::Uuid,
  pub skill_id: String,
  pub version: Option<String>,
}

/// 経歴に紐づくスキル複数新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerSkills {
  pub skills: Vec<NewCareerSkill>,
}

/// 経歴に紐づくスキル更新用.
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateCareerSkill {
  pub version: Option<String>,
}

/// 経歴に紐づくスキル削除用（複数可）.
#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteCareerSkills {
  pub career_id: Uuid,
  pub skill_ids: Vec<String>,
}

/// 経歴に紐づく担当工程取得用.
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct CareerProcess {
  pub career_id: uuid::Uuid,
  pub process_id: i32, // SERIAL/INTEGER型
}

/// 経歴に紐づく担当工程新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerProcess {
  pub career_id: uuid::Uuid,
  pub process_id: i32,
}

/// 経歴に紐づく担当工程複数新規登録用.
#[derive(Debug, Serialize, Deserialize)]
pub struct NewCareerProcesses {
  pub processes: Vec<NewCareerProcess>,
}

/// 経歴に紐づく担当工程更新用.
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateCareerProcess {
  pub career_id: Option<uuid::Uuid>,
  pub process_id: Option<i32>,
}

/// 経歴に紐づく担当工程削除用（複数可）.
#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteCareerProcesses {
  pub career_id: Uuid,
  pub process_ids: Vec<i32>,
}
