import AuthApi from "@/api/AuthApi";
import RedevContentApi from "@/api/RedevApi";
import { DEV_API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("RedevApi", () => {
  it("list", async () => {
    const log = await loginTestAccount();

    const redevContentApi = new RedevContentApi({
      baseURL: DEV_API_URL,
      accessToken: log.data.api_token,
    });

    await redevContentApi.redevList();
  });
});
