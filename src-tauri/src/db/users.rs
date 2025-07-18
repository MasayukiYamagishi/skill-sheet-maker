use crate::db::{NewUser, UpdateUser, User};
use sqlx::PgPool;
use uuid::Uuid;

/**
 * ユーザ情報全件取得.
 */
pub async fn fetch_all_users(pool: &PgPool) -> Result<Vec<User>, sqlx::Error> {
  let users = sqlx::query_as::<_, User>("SELECT * FROM users").fetch_all(pool).await?;
  Ok(users)
}

/**
 * 指定したIDのユーザ情報取得.
 */
pub async fn fetch_user_by_id(pool: &PgPool, id: uuid::Uuid) -> sqlx::Result<Option<User>> {
  sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1").bind(id).fetch_optional(pool).await
}

/**
 * ユーザ新規登録.
 */
pub async fn insert_user(pool: &PgPool, payload: NewUser) -> Result<uuid::Uuid, sqlx::Error> {
  let rec = sqlx::query_scalar!(
    r#"
    INSERT INTO users (
      user_identifier, name, name_kana, birth_date, gender, email,
      mbti_code, joined_at, retired_at, final_education, status, affiliation,
      avatar_path, github_url, pr_text, specialty, tech_strength, sales_comment, toeic_score, other_skills
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,
      $7,$8,$9,$10,$11,$12,
      $13,$14,$15,$16,$17,$18,$19,$20
    )
    RETURNING id
    "#,
    payload.user_identifier,
    payload.name,
    payload.name_kana,
    payload.birth_date,
    payload.gender,
    payload.email,
    payload.mbti_code,
    payload.joined_at,
    payload.retired_at,
    payload.final_education,
    payload.status,
    payload.affiliation,
    payload.avatar_path,
    payload.github_url,
    payload.pr_text,
    payload.specialty,
    payload.tech_strength,
    payload.sales_comment,
    payload.toeic_score,
    payload.other_skills,
  )
  .fetch_one(pool)
  .await?;

  Ok(rec)
}

/**
 * ユーザ情報更新.
 */
pub async fn update_user_by_id(pool: &PgPool, id: Uuid, payload: UpdateUser) -> Result<u64, sqlx::Error> {
  // 動的なSET句生成もできるが、今回は手動で全部列挙する（全項目Optional前提）
  let res = sqlx::query(
    r#"
        UPDATE users SET
            user_identifier = COALESCE($2, user_identifier),
            name = COALESCE($3, name),
            name_kana = COALESCE($4, name_kana),
            birth_date = COALESCE($5, birth_date),
            gender = COALESCE($6, gender),
            email = COALESCE($7, email),
            mbti_code = COALESCE($8, mbti_code),
            joined_at = COALESCE($9, joined_at),
            retired_at = COALESCE($10, retired_at),
            final_education = COALESCE($11, final_education),
            status = COALESCE($12, status),
            affiliation = COALESCE($13, affiliation),
            avatar_path = COALESCE($14, avatar_path),
            github_url = COALESCE($15, github_url),
            pr_text = COALESCE($16, pr_text),
            specialty = COALESCE($17, specialty),
            tech_strength = COALESCE($18, tech_strength),
            sales_comment = COALESCE($19, sales_comment),
            toeic_score = COALESCE($20, toeic_score),
            other_skills = COALESCE($21, other_skills),
            updated_at = now()
        WHERE id = $1
        "#,
  )
  .bind(id)
  .bind(payload.user_identifier)
  .bind(payload.name)
  .bind(payload.name_kana)
  .bind(payload.birth_date)
  .bind(payload.gender)
  .bind(payload.email)
  .bind(payload.mbti_code)
  .bind(payload.joined_at)
  .bind(payload.retired_at)
  .bind(payload.final_education)
  .bind(payload.status)
  .bind(payload.affiliation)
  .bind(payload.avatar_path)
  .bind(payload.github_url)
  .bind(payload.pr_text)
  .bind(payload.specialty)
  .bind(payload.tech_strength)
  .bind(payload.sales_comment)
  .bind(payload.toeic_score)
  .bind(payload.other_skills)
  .execute(pool)
  .await?
  .rows_affected();

  Ok(res)
}

/**
 * ユーザ情報削除.
 * IDsに入っているユーザをまとめて削除する
 */
pub async fn delete_users_by_ids(pool: &PgPool, ids: &[Uuid]) -> Result<u64, sqlx::Error> {
  let mut tx = pool.begin().await?;
  let n = sqlx::query("DELETE FROM users WHERE id = ANY($1)").bind(ids).execute(&mut *tx).await?.rows_affected();
  tx.commit().await?;
  Ok(n)
}
