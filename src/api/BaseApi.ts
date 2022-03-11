import axios, { AxiosInstance } from "axios";
import { errorLogger, requestLogger, responseLogger } from "axios-logger";
import ApiError from "./ApiError";
import ApiRequestOptions from "./ApiRequestOptions";

export interface BaseApiOptions {
  /**
   *
   */
  baseURL: string;
  accessToken?: string;
}

/**
 * Axios가 아닌 다른 클라이언트를 사용할 경우가 생길 수 있음으로,
 * 설정값 및 Exception을 통일하여 관리한다.
 * BaseApi 클래스를 상속받아 API Client를 구현하도록 한다.
 */
export default class BaseApi {
  axios: AxiosInstance;

  constructor(options: BaseApiOptions) {
    const headers: Record<string, string> = {};

    if (options.accessToken) {
      headers.Authorization = `Bearer ${options.accessToken}`;
    }

    this.axios = axios.create({ baseURL: options.baseURL, headers });

    // 로깅 (개발 환경, 테스트 환경에서만)
    if (["development", "test"].includes(process.env.NODE_ENV)) {
      this.axios.interceptors.request.use(requestLogger, errorLogger);
      this.axios.interceptors.response.use(responseLogger, errorLogger);
    }
  }

  /**
   * 기본 request 메서드이다.
   * 성공시 T generic에 따라 결과를 리턴한다.
   * 실패시 ApiException을 던진다.
   */
  request<T>({ url, method, data, params }: ApiRequestOptions) {
    return this.axios
      .request<T>({
        url,
        method,
        params,
        data,
      })
      .then((response) => response.data)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw new ApiError(
            error.response?.status ?? 500,
            error.response?.data.message ?? "에러가 발생했습니다."
          );
        } else {
          throw error;
        }
      });
  }
}
