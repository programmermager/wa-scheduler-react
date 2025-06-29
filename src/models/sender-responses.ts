import type { BaseResponse } from "./base-response";
import type { Pagination } from "./objects/pagination-model";

export interface SenderResponse extends BaseResponse {
  data: Data;
}

export interface Data extends Pagination {
  data: Datum[];
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
