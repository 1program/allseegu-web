import shortid from "shortid";
import { inject, provide, Ref, ref } from "vue";

export interface AlertMessage {
  id: string;
  message: string;
}

export interface AlertsContext {
  alerts: Ref<AlertMessage[]>;
  close: (id: string) => void;
  open: (message: string) => void;
}

export function provideAlerts() {
  const alerts = ref<AlertMessage[]>([]);

  const close = (id: string) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  };

  const open = (message: string) => {
    alerts.value.push({
      id: shortid(),
      message,
    });
  };

  const context = { alerts, close, open };

  provide("ALERTS", context);

  return context;
}

export function useAlerts() {
  const alerts = inject<AlertsContext>("ALERTS");

  if (alerts == null) {
    throw new Error("Cannot use `useAlerts` before provide alerts context.");
  }

  return alerts;
}

export function useAlert() {
  const { alerts, open } = useAlerts();

  return open;
}
