export interface Symptome {
  title: string;
  month: Month;
  slug: string;
  status: string;
  code: string;
}

export interface Meetings {
  title: string;
  code: string;
  isMandatory: boolean;
  month: Month;
  maxMonth?: number;
}

export interface Month {
  title: string;
  description: string;
  monthNumber: number;
  meetings: Meetings[];
  symptoms: Symptome[];
}
