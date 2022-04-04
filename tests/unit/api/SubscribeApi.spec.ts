import RedevApi from "@/api/RedevApi";
import SubscribeApi from "@/api/SubscribeApi";
import { API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("SubscribeApi", () => {
  it("Subscription list", async () => {
    const log = await loginTestAccount();

    const revApi = new RedevApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    const subscribeApi = new SubscribeApi({
      baseURL: API_URL,
      accessToken: log.data.api_token,
    });

    const revId = (await revApi.list({})).data.data[0]?.id;

    await subscribeApi.subscribeList({ revId });
  });
});
