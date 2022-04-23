import { inject, provide } from "vue";

import ApiError from "@/api/ApiError";

export const UI_CONTEXT_SYMBOL = Symbol("UI_CONTEXT");

export interface UiProviderParams {
  onMessage: (message: string) => void;
}

export interface UiContext {
  handleError: (error: unknown) => void;
  notImplemented: () => void;
}

export function provideUi({ onMessage }: UiProviderParams) {
  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      onMessage(error.message);
    } else {
      onMessage("다시 시도해 주세요.");
    }
  };

  const notImplemented = () => {
    onMessage("해당 기능은 준비중입니다.");
  };

  const context = {
    handleError,
    notImplemented,
  };

  provide(UI_CONTEXT_SYMBOL, context);

  return context;
}

export function useUi() {
  const context = inject<UiContext>(UI_CONTEXT_SYMBOL);

  if (context == null) {
    throw new Error("UiContext is not provided.");
  }

  return context;
}
