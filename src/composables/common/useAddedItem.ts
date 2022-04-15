import { ref, Ref, watch } from "vue";

export function useAddedItem<V>(list: Ref<V[]>, extractKey: (item: V) => string) {
  const added = ref<V[]>();

  watch(
    () => list.value,
    (current, previous) => {
      const newAdded: V[] = [];

      const previousIds: Record<string, boolean> = {};

      previous.forEach((item) => {
        previousIds[extractKey(item)] = true;
      });

      current.forEach((item) => {
        if (previousIds[extractKey(item)] !== true) {
          newAdded.push(item);
        }
      });

      added.value = newAdded;
    }
  );

  return added;
}
