import UserApi from "@/api/UserApi";
import { DEV_API_URL } from "@/lib/config";
import { loginTestAccount } from "./helpers";

describe("UserApi", () => {
  it("me", async () => {
    const log = await loginTestAccount();

    const userApi = new UserApi({
      baseURL: DEV_API_URL,
      accessToken: log.data.api_token,
    });

    await userApi.me();
  });
});
