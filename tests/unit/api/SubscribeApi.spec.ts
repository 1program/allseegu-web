import AuthApi from "@/api/AuthApi";
import RedevApi from "@/api/RedevApi";
import SubscribeApi from "@/api/SubscribeApi";
import { DEV_API_URL } from "@/config";

describe("SubscribeApi", () => {
  const authApi = new AuthApi({
    baseURL: DEV_API_URL,
  });

  it("Subscription list", async () => {
    const loginResult = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    const revApi = new RedevApi({
      baseURL: DEV_API_URL,
      accessToken: loginResult.data.api_token,
    });

    const subscribeApi = new SubscribeApi({
      baseURL: DEV_API_URL,
      accessToken: loginResult.data.api_token,
    });

    const revId = (await revApi.redevList()).data.data[0]?.id;

    await subscribeApi.subscribeList({ revId });
  });
});
