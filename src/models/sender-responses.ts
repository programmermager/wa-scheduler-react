export interface SenderResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  user_id: number;
  country_code: string;
  phone: string;
  token: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
