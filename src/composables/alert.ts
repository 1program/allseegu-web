import { inject, provide, Ref, ref } from "vue";
import shortid from "shortid";

export interface AlertMessage {
  id: string;
  message: string;
}

export interface AlertsContext {
  alerts: Ref<AlertMessage[]>;
  close: (id: string) => void;
}

export function provideAlerts() {
  const alerts = ref<AlertMessage[]>([]);

  const close = (id: string) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  };

  const context = { alerts, close };

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
  const { alerts } = useAlerts();

  return function alert(message: string) {
    alerts.value.push({
      id: shortid(),
      message,
    });
  };
}
