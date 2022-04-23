import { ref } from "vue";

import { geolocationErrorMessage } from "@/utils/common/geolocationErrorMessage";

export interface UseGeolocationOptions {
  onMessage: (message: string) => void;
}

/**
 * Navigator.Gelocation을 vue reactivity와 함께 사용한다.
 */
export function useGeolocation({ onMessage }: UseGeolocationOptions) {
  const position = ref<GeolocationPosition | null>(null);
  const initialPosition = ref<GeolocationPosition | null>(null);
  const error = ref<GeolocationPositionError | null>(null);
  const loading = ref(false);

  const watchId = ref();

  const stop = () => {
    if (watchId.value != null) {
      navigator.geolocation.clearWatch(watchId.value);

      watchId.value = null;
    }
  };

  const start = () => {
    stop();

    loading.value = true;

    watchId.value = navigator.geolocation.watchPosition(
      (newPosition) => {
        position.value = newPosition;
        loading.value = false;
      },
      (newError) => {
        error.value = newError;
        loading.value = false;
      }
    );

    return new Promise<GeolocationPosition>((resolve, reject) => {
      watchId.value = navigator.geolocation.getCurrentPosition(
        (newPosition) => {
          initialPosition.value = newPosition;
          position.value = newPosition;
          loading.value = false;
          resolve(newPosition);
        },
        (newError) => {
          error.value = newError;
          loading.value = false;
          onMessage(geolocationErrorMessage(newError));
          reject(newError);
        }
      );
    });
  };

  return { start, stop, loading, initialPosition, position };
}
