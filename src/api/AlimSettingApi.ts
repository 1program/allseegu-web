import { AlimSetting, AlimSettingInput } from "@/models/alim-setting";
import { ApiResponse } from "@/models/common";

import BaseApi from "./BaseApi";

export class AlimSettingApi extends BaseApi {
  /**
   * 알림설정 조회
   */
  get = async () =>
    this.request<ApiResponse<AlimSetting | undefined>>({
      method: "GET",
      url: "/alim-setting",
    });

  /**
   * 알림설정 생성
   */
  create = async (input: AlimSettingInput) =>
    this.request<ApiResponse<AlimSetting>>({
      method: "POST",
      url: "/alim-setting",
      data: input,
    });

  /**
   * 알림설정 수정
   */
  update = async (input: AlimSettingInput) =>
    this.request<ApiResponse<AlimSetting>>({
      method: "PATCH",
      url: "/alim-setting",
      data: input,
    });
}
