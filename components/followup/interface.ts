export interface Symptome {
  label: string;
  slug: string;
  status: string;
  code: string;
}

export interface Meetings {
  label: string;
  code: string;
  mandatory: boolean;
  month: number;
}
