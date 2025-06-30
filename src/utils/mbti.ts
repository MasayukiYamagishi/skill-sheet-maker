import { MbtiDataConst as MBTI_DATA } from "@/constants/mbtiDetails";
import { MbtiCode } from "@/types/types";

export const getMbtiDetails = (code: MbtiCode) => {
  if (!Object.prototype.hasOwnProperty.call(MBTI_DATA, code)) {
    throw new Error(`不正なMBTIコードです: ${code}`);
  }

  return MBTI_DATA[code];
};
