import ApiError from "@/api/ApiError";
import { inject, provide } from "vue";

export const UI_CONTEXT_SYMBOL = Symbol("UI_CONTEXT");

export interface UiProviderParams {
  onMessage: (message: string) => void;
}

export interface UiContext {
  handleError: (error: unknown) => void;
}

export function provideUi({ onMessage }: UiProviderParams) {
  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      onMessage(error.message);
    } else {
      onMessage("다시 시도해 주세요.");
    }
  };

  const context = {
    handleError,
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
