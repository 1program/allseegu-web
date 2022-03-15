import RedevContentApi from "@/api/RedevApi";
import { API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("RedevApi", () => {
  it("list", async () => {
    const log = await loginTestAccount();

    const redevContentApi = new RedevContentApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    await redevContentApi.redevList({});
  });
});
