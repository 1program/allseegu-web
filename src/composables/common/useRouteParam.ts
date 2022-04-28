import { computed } from "vue";
import { useRoute } from "vue-router";

export const useRouteParam = <T>(key: string, parse: (value: string) => T) => {
  const route = useRoute();

  return computed(() => {
    const value = route.params[key] ?? null;

    if (value == null) {
      return null;
    }

    if (Array.isArray(value)) {
      return parse(value[0]);
    }

    return parse(value);
  });
};
