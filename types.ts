
export enum CopyStyle {
  UNCLE_GUN = 'UNCLE_GUN', // 金鎗大叔 - Direct Response / Sales
  EILEEN = 'EILEEN', // 張愛玲 - Literary / Sensory
  LU_XUN = 'LU_XUN', // 魯迅 - Critical / Sarcastic
  WANG = 'WANG', // 王世堅 - Dramatic / Politician
}

export interface StyleConfig {
  id: CopyStyle;
  name: string;
  description: string;
  icon: string; // Emoji
  color: string;
}

export interface AidaResponse {
  title: string;
  attention: string;
  interest: string;
  desire: string;
  action: string;
  fullPost: string; // A composed version ready to copy
  hashtags: string[];
}

export interface GenerateState {
  isLoading: boolean;
  result: AidaResponse | null;
  error: string | null;
}
