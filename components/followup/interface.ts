export interface Symptome {
  title: string;
  month: Month;
  slug: string;
  status: string;
  code: string;
  currentMonth?: number;
}

export interface Meetings {
  title: string;
  code: string;
  isMandatory: boolean;
  months?: Month[];
  monthNumber?: number;
  maxMonth?: number;
  hasMoreInfo?: boolean;
}

export interface MeetingInfo {
  title: string;
  description: string;
  img_url: string;
}

export interface Month {
  title: string;
  description: string;
  monthNumber: number;
  meetings: Meetings[];
  symptoms: Symptome[];
}
