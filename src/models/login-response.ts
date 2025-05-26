import type { BaseResponse } from "./base-response";

export interface LoginResp extends BaseResponse {
  token: string;
}
