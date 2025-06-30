// src/components/icons.ts
import {
  MdOutlineMailOutline,
  MdOutlineFavorite,
  MdOutlineShare,
  MdOutlineArchive,
  MdOutlineInfo,
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineWarningAmber,
  MdOutlineClose,
} from 'react-icons/md';

// 使いたいアイコンをここに追加していく
export const iconMap = {
  archive: MdOutlineArchive,
  close: MdOutlineClose,
  error: MdOutlineErrorOutline,
  favorite: MdOutlineFavorite,
  info: MdOutlineInfo,
  mail: MdOutlineMailOutline,
  share: MdOutlineShare,
  success: MdOutlineCheckCircleOutline,
  warning: MdOutlineWarningAmber,
} as const;

export type IconKey = keyof typeof iconMap;
