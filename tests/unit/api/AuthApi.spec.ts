import AuthApi from "@/api/AuthApi";
import { DEV_API_URL } from "@/lib/config";

describe("AuthApi", () => {
  const authApi = new AuthApi({
    baseURL: DEV_API_URL,
  });

  it("login", async () => {
    const result = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    expect(result.data.api_token).not.toBeNull();
  });

  it("logout", async () => {
    const loginResult = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    const loggedAuthApi = new AuthApi({
      baseURL: DEV_API_URL,
      accessToken: loginResult.data.api_token,
    });

    const result = await loggedAuthApi.logout();

    expect(result.message).not.toBeNull();
  });
});
