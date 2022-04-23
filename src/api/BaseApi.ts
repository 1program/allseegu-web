import axios, { AxiosInstance } from "axios";
import { errorLogger, requestLogger, responseLogger } from "axios-logger";

import ApiError from "./ApiError";
import ApiRequestOptions from "./ApiRequestOptions";

export interface BaseApiOptions {
  /**
   * API baseURL
   */
  baseURL: string;

  /**
   * Access token
   */
  accessToken?: string | null;
}

/**
 * Axios가 아닌 다른 http 클라이언트를 사용할 경우가 생길 수 있음으로,
 * 설정값 및 Exception을 통일하여 관리한다.
 * BaseApi 클래스를 상속받아 API Client를 구현하도록 한다.
 */
export default class BaseApi {
  private axios: AxiosInstance;

  constructor(public readonly options: BaseApiOptions) {
    this.axios = axios.create({ baseURL: this.options.baseURL, headers: this.headers });

    // 로깅 (테스트 환경에서만)
    if (["test"].includes(process.env.NODE_ENV)) {
      this.axios.interceptors.request.use(requestLogger, errorLogger);
      this.axios.interceptors.response.use(responseLogger, errorLogger);
    }
  }

  /**
   * 제공된 options로 http request header를 반환한다.
   */
  public get headers() {
    const headers: Record<string, string> = {};

    if (this.options.accessToken) {
      headers.Authorization = `Bearer ${this.options.accessToken}`;
    }

    return headers;
  }

  /**
   * 기본 request 메서드이다.
   * 성공시 T generic에 따라 결과를 리턴한다.
   * 실패시 ApiException을 던진다.
   */
  public request<T>({ url, method, data, params }: ApiRequestOptions) {
    return this.axios
      .request<T>({
        url,
        method,
        params,
        data,
      })
      .then((response) => response.data)
      .catch(BaseApi.handleError);
  }

  private static handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status ?? 500,
        error.response?.data.message ?? "에러가 발생했습니다."
      );
    } else {
      throw error;
    }
  }
}
