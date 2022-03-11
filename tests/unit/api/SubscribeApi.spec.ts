import RedevApi from "@/api/RedevApi";
import SubscribeApi from "@/api/SubscribeApi";
import { DEV_API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("SubscribeApi", () => {
  it("Subscription list", async () => {
    const log = await loginTestAccount();

    const revApi = new RedevApi({
      baseURL: DEV_API_URL,
      accessToken: log.data.api_token,
    });

    const subscribeApi = new SubscribeApi({
      baseURL: DEV_API_URL,
      accessToken: log.data.api_token,
    });

    const revId = (await revApi.redevList()).data.data[0]?.id;

    await subscribeApi.subscribeList({ revId });
  });
});
