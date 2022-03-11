import AuthApi from "@/api/AuthApi";
import UserApi from "@/api/UserApi";
import { DEV_API_URL } from "@/lib/config";

describe("UserApi", () => {
  const authApi = new AuthApi({
    baseURL: DEV_API_URL,
  });

  it("me", async () => {
    const loginResult = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    const userApi = new UserApi({
      baseURL: DEV_API_URL,
      accessToken: loginResult.data.api_token,
    });

    await userApi.me();
  });
});
