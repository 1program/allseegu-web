import RedevApi from "@/api/RedevApi";
import { API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("RedevApi", () => {
  it("list", async () => {
    const log = await loginTestAccount();

    const redevApi = new RedevApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    await redevApi.redevList({});
  });

  it("search", async () => {
    const log = await loginTestAccount();

    const redevApi = new RedevApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    await redevApi.searchRedev({ query: "ex" });
  });
});
