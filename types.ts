
export interface CompanyInfo {
  myCompanyName: string;
  senderName: string;
  productCategory: string;
  keyStrengths: string[];
  targetCompanyName: string;
  targetPersonName: string;
  targetCompanyFeatures: string;
  specialRequest: string;
  email: string;
  linkedin: string;
  phone: string;
  mailStrategy: 'trust' | 'quality' | 'speed';
}

export interface GeneratedMail {
  subject_ko: string;
  body_ko: string;
  subject_jp: string;
  body_jp: string;
  strategy_tip: string;
}

export interface GeminiResponse {
  mail: GeneratedMail;
}
