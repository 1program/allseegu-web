import AuthApi from "@/api/AuthApi";
import { DEV_API_URL } from "@/lib/config";
import { loginTestAccount, TEST_ACCOUNT } from "./helpers";

describe("AuthApi", () => {
  it("login", async () => {
    const authApi = new AuthApi({
      baseURL: DEV_API_URL,
    });

    const result = await authApi.login({
      data: TEST_ACCOUNT,
    });

    expect(result.data.api_token).not.toBeNull();
  });

  it("logout", async () => {
    const log = await loginTestAccount();

    const authApi = new AuthApi({
      baseURL: DEV_API_URL,
      accessToken: log.data.api_token,
    });

    const result = await authApi.logout();

    expect(result.message).not.toBeNull();
  });
});
