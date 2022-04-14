import UserApi from "@/api/UserApi";

export function validateEmail(userApi: UserApi) {
  return async (value?: string) => {
    // 입력 안했을 때에는 검증하지 말아야 한다.
    if (value == null) return true;

    try {
      await userApi.duplicate({
        field: "email",
        value,
      });
      return true;
    } catch (ex) {
      return false;
    }
  };
}

export function validateNickname(userApi: UserApi) {
  return async (value: string) => {
    // 입력 안했을 때에는 검증하지 말아야 한다.
    if (value == null) return true;

    try {
      await userApi.duplicate({
        field: "nickname",
        value,
      });
      return true;
    } catch (ex) {
      return false;
    }
  };
}
