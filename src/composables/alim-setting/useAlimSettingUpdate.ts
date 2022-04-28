import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { AlimSetting, AlimSettingInput } from "@/models/alim-setting";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";
import { useAlimSetting } from "./useAlimSetting";

export function useAlimSettingUpdate() {
  const api = useApi();

  const alimSetting = useAlimSetting();

  const queryClient = useQueryClient();

  const me = useMe();

  const alert = useAlert();

  const mutation = useMutation({
    mutationKey: "ALIM_SETTING_UPDATE",
    mutationFn: (options: AlimSettingInput) => {
      if (alimSetting.data == null) {
        return api.alimSetting.create(options);
      }

      return api.alimSetting.update(options);
    },
    onSuccess: (data) => {
      queryClient.setQueryData<AlimSetting>(["ALIM_SETTING", me.data?.id], data.data);
    },
    // eslint-disable-next-line
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
