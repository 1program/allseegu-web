import AuthApi from "@/api/AuthApi";
import { API_URL, TEST_ACCOUNT } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("AuthApi", () => {
  it("login", async () => {
    const authApi = new AuthApi({
      baseURL: API_URL,
    });

    const result = await authApi.login({
      data: TEST_ACCOUNT,
    });

    expect(result.data.api_token).not.toBeNull();
  });

  it("logout", async () => {
    const log = await loginTestAccount();

    const authApi = new AuthApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    const result = await authApi.logout();

    expect(result.message).not.toBeNull();
  });
});
