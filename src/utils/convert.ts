import { ChartData, ChartDataset } from "chart.js";
import { SkillOptions } from "@/constants/skills";
import type { Skill, SkillCustom } from "@/types/types";

/**
 * Skill[] を Chart.js の Radar 用データ構造に変換する
 */
export function convertSkillsToRadarData(
  skills: Skill[]
): ChartData<"radar", number[], string> {
  // 1) labels: skillId からラベル、もしくは customName を取り出す
  const labels = skills.map((skill) => {
    if ("skillId" in skill) {
      const opt = SkillOptions.find((o) => o.id === skill.skillId);
      return opt?.label ?? skill.skillId;
    } else {
      return (skill as SkillCustom).customName;
    }
  });

  // 2) data: level をそのまま使う
  const dataPoints = skills.map((skill) => skill.level);

  // TODO: ここの色の設定は別の場所から持ってこれるようにしたほうが良い。
  // 3) datasets を組み立て
  const dataset: ChartDataset<"radar", number[]> = {
    label: "Skill Levels",
    data: dataPoints,
    borderWidth: 1,
    backgroundColor: "rgba(63, 81, 181, 0.2)", // optional: 塗りつぶし色
    borderColor: "rgba(63, 81, 181, 1)", // optional: 線の色
    pointBackgroundColor: "rgba(63, 81, 181, 1)", // optional: 点の色
  };

  return {
    labels,
    datasets: [dataset],
  };
}
