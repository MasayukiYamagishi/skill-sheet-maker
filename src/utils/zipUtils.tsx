import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { User } from "../types/type";
import { pdf } from "@react-pdf/renderer";
import SkillSheetPdf from "../components/SkillSheetPdf";

export const exportUsersToZip = async (users: User[]): Promise<void> => {
  const zip = new JSZip();
  const pdfsFolder = zip.folder("スキルシート_PDF");

  for (const user of users) {
    // PDF生成
    const pdfBlob = await pdf(
      <SkillSheetPdf user={user} companyLogo={user.company_logo} />
    ).toBlob();
    pdfsFolder?.file(`${user.name}_スキルシート.pdf`, pdfBlob);
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "スキルシート_一括.zip");
  });
};
