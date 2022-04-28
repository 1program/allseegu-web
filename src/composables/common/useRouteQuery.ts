import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

/**
 * route query로부터 value를 파싱한다.
 */
export const useRouteQuery = <T>(
  key: string,
  parse: (value: string) => T,
  replace = false,
  // eslint-disable-next-line
  state: any = {}
) => {
  const route = useRoute();
  const router = useRouter();

  return computed({
    get: () => {
      const value = route.query[key] ?? null;

      if (value == null) {
        return null;
      }

      if (Array.isArray(value)) {
        return value.filter((item): item is string => item != null).map(parse);
      }

      return parse(value);
    },
    set: (value) => {
      router.push({
        replace,
        query: {
          ...route.query,
          // eslint-disable-next-line
          [key]: !!value ? (value as any) : undefined,
        },
        state,
      });
    },
  });
};

/**
 * route query에서 단일 값을 사용한다.
 */
export const useRouteQueryValue = <T>(
  key: string,
  parse: (value: string) => T,
  replace = false,
  // eslint-disable-next-line
  state: any = {}
) => {
  const query = useRouteQuery<T>(key, parse, replace, state);

  return computed({
    get: () => (Array.isArray(query.value) ? query.value[0] : query.value),
    set: (newValue) => {
      query.value = newValue;
    },
  });
};

/**
 * route query 값을 배열로 사용한다.
 */
export const useRouteQueryArray = <T>(
  key: string,
  parse: (value: string) => T,
  replace = false,
  // eslint-disable-next-line
  state: any = {}
) => {
  const query = useRouteQuery<T>(key, parse, replace, state);

  return computed({
    get: () => {
      if (query.value == null) {
        return [];
      }

      if (Array.isArray(query.value)) {
        return query.value;
      }

      return [query.value];
    },
    set: (newArray) => {
      query.value = newArray;
    },
  });
};
