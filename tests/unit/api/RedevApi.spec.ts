import AuthApi from "@/api/AuthApi";
import RedevApi from "@/api/RedevApi";
import { DEV_API_URL } from "@/lib/config";

describe("RedevApi", () => {
  const authApi = new AuthApi({
    baseURL: DEV_API_URL,
  });

  it("list", async () => {
    const result = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    const redevApi = new RedevApi({
      baseURL: DEV_API_URL,
      accessToken: result.data.api_token,
    });

    await redevApi.redevList();
  });

  it("search", async () => {
    const result = await authApi.login({
      request: { email: "admin@demo.com", password: "abcd1234" },
    });

    const redevApi = new RedevApi({
      baseURL: DEV_API_URL,
      accessToken: result.data.api_token,
    });

    await redevApi.searchRedev({ query: "ex" });
  });
});
