import type { BaseResponse } from "./base-response";
import type { Pagination } from "./objects/pagination-model";

export interface ContactResponse extends BaseResponse {
  data: Data;
}

export interface Data extends Pagination {
  data: ContactModel[];
}

export interface ContactModel {
  id: number;
  user_id: number;
  country_code: string;
  phone: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
