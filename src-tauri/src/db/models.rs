use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

/**
 * ユーザ情報.
 */
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

/**
 * ユーザ情報新規登録用.
 * id, created_at, updated_atはDB側で自動設定されるので不要
 */
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

/**
 * ユーザ情報更新用.
 * PUT/PATCH想定、全フィールドOptionalで部分更新できるようにする.
 */
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
