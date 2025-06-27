import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import type { User } from "../types/type";

// Register font
Font.register({
  family: "Noto Sans JP",
  src: "/fonts/NotoSansJP-Regular.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Noto Sans JP", // 日本語フォントを指定
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  companyLogo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: "1px solid #000",
    paddingBottom: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectDetails: {
    fontSize: 9,
    marginBottom: 2,
  },
  projectSection: {
    marginBottom: 10,
    border: "1px solid #eee",
    padding: 5,
  },
});

interface SkillSheetPdfProps {
  user: User;
  companyLogo?: string;
}

const SkillSheetPdf: React.FC<SkillSheetPdfProps> = ({ user, companyLogo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>スキルシート</Text>
        {companyLogo && <Image style={styles.companyLogo} src={companyLogo} />}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基本情報</Text>
        <Text style={styles.text}>名前: {user.name}</Text>
        <Text style={styles.text}>所属: {user.affiliation}</Text>
        <Text style={styles.text}>年齢: {user.age}</Text>
        <Text style={styles.text}>性別: {user.gender}</Text>
        <Text style={styles.text}>資格: {user.qualification}</Text>
        <Text style={styles.text}>最終学歴: {user.education}</Text>
        <Text style={styles.text}>稼働 (現職年数等): {user.work_term}</Text>
        <Text style={styles.text}>最寄り駅: {user.station}</Text>
        <Text style={styles.text}>得意分野: {user.speciality}</Text>
        <Text style={styles.text}>得意技術: {user.strong_skills}</Text>
        <Text style={styles.text}>自己PR: {user.pr}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>プロジェクト経歴</Text>
        {user.projects.map((proj) => (
          <View key={proj.id} style={styles.projectSection}>
            <Text style={styles.projectTitle}>{proj.title}</Text>
            <Text style={styles.projectDetails}>期間: {proj.period}</Text>
            <Text style={styles.projectDetails}>
              チーム規模: {proj.team_size}人
            </Text>
            <Text style={styles.projectDetails}>サーバー: {proj.server}</Text>
            <Text style={styles.projectDetails}>OS: {proj.os}</Text>
            <Text style={styles.projectDetails}>DB: {proj.db}</Text>
            <Text style={styles.projectDetails}>
              ネットワーク: {proj.network}
            </Text>
            <Text style={styles.projectDetails}>
              パッケージ: {proj.package}
            </Text>
            <Text style={styles.projectDetails}>ツール: {proj.tools}</Text>
            <Text style={styles.projectDetails}>
              使用言語:{" "}
              {proj.languages.map((l) => `${l.name} (${l.version})`).join(", ")}
            </Text>
            <Text style={styles.projectDetails}>
              担当工程: {proj.phases.join(", ")}
            </Text>
            <Text style={styles.projectDetails}>役割: {proj.role}</Text>
            <Text style={styles.projectDetails}>規模: {proj.scale}</Text>
            <Text style={styles.projectDetails}>詳細: {proj.details}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default SkillSheetPdf;
