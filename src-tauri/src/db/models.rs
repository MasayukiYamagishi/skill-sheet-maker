use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

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

/// 資格マスタ
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Qualification {
  pub id: String,
  pub name: String,
  pub description: Option<String>,
  pub is_national: bool,
}

/// スキルカテゴリマスタ
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillCategories {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
}

/// スキルタグマスタ
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillTags {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
}

/// スキルマスタ
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Skill {
  pub id: String,
  pub label: String,
  pub description: Option<String>,
  pub devicon_id: Option<String>,
  pub category_id: String,
}

/// スキルタグ付け
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SkillTagMap {
  pub skill_id: String,
  pub tag_id: String,
}

/// 担当工程マスタ
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct MasterProcesses {
  pub id: i32,
  pub name: String,
}
