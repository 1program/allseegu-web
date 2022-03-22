import { inject, provide, Ref, ref } from "vue";
import shortid from "shortid";

export interface ConfirmMessage {
  id: string;
  message: string;
  okMessage?: string;
  cancelMessage?: string;
  resolve: (value: boolean) => void;
}

export interface ConfirmContext {
  confirms: Ref<ConfirmMessage[]>;
  ok: (id: string) => void;
  cancel: (id: string) => void;
}

export function provideConfirm() {
  const confirms = ref<ConfirmMessage[]>([]);

  const close = (id: string) => {
    confirms.value = confirms.value.filter((alert) => alert.id !== id);
  };

  const ok = (id: string) => {
    const confirm = confirms.value.find((item) => item.id === id);

    confirm?.resolve(true);

    close(id);
  };

  const cancel = (id: string) => {
    const confirm = confirms.value.find((item) => item.id === id);

    confirm?.resolve(false);

    close(id);
  };

  const context = { confirms, ok, cancel };

  provide("CONFIRM", context);

  return context;
}

export function useConfirms() {
  const context = inject<ConfirmContext>("CONFIRM");

  if (context == null) {
    throw new Error("Cannot use `useConfirms` before provide confirms context.");
  }

  return context;
}

export function useConfirm() {
  const { confirms } = useConfirms();

  return function confirm(message: string, okMessage?: string, cancelMessage?: string) {
    return new Promise<boolean>((resolve) => {
      confirms.value.push({
        id: shortid(),
        message,
        okMessage,
        cancelMessage,
        resolve,
      });
    });
  };
}
