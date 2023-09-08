export interface Question {
  label: string;
  code: string;
  slug: string;
  isSpecial?: boolean;
  image?: string;
  verticalAnswer?: boolean;
  actionMatomo: string;
  responses: Response[];
  isEditable?: boolean;
}

export interface Response {
  label: string;
  value: string;
  redirectScreen?: boolean;
  redirectScreenContent?: string;
  phoneNumber?: string;
  image?: string;
  labelSearch?: string;
  boldBottom?: String;
  isDanger?: boolean;
  keywords?: string[];
  question?: Question;
  nameMatomo: string;
  valueMatomo?: number;
}
