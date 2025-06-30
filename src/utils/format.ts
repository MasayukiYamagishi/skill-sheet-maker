/**
 * Date型の日付を「yyyy年MM月dd日」の形にフォーマットする.
 *
 * @param date 日付
 * @returns フォーマットされた日付
 */
export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "未設定";
  }

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
