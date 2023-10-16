export interface Symptome {
  title: string;
  month: Month;
  slug: string;
  status: string;
  code: string;
  currentMonth?: number;
  phoneNumber?: string;
}

export interface Meetings {
  title: string;
  code: string;
  isMandatory: boolean;
  months?: Month[];
  monthNumber?: number;
  maxMonth?: number;
  hasMoreInfo?: boolean;
  meeting_info?: MeetingInfo;
}

export interface MeetingInfo {
  title: string;
  description: string;
  img_slug: string;
}

export interface Month {
  title: string;
  description: string;
  monthNumber: number;
  meetings: Meetings[];
  symptoms: Symptome[];
}
