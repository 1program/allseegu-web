import { inject, provide, Ref, ref } from "vue";
import shortid from "shortid";

export interface ToastMessage {
  id: string;
  message: string;
}

export interface ToastContext {
  toasts: Ref<ToastMessage[]>;
  close: (id: string) => void;
  open: (message: string) => void;
}

export function provideToasts() {
  const toasts = ref<ToastMessage[]>([]);

  const close = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const open = (message: string) => {
    const newToast = {
      id: shortid(),
      message,
    };

    toasts.value.push(newToast);

    /// 3초 후 close
    setTimeout(() => close(newToast.id), 3000);
  };

  const context = {
    toasts,
    close,
    open,
  };

  provide("TOASTS", context);

  return context;
}

export function useToasts() {
  const alerts = inject<ToastContext>("TOASTS");

  if (alerts == null) {
    throw new Error("Cannot use `useToasts` before provide toast context.");
  }

  return alerts;
}

export function useToast() {
  const { open } = useToasts();

  return open;
}
