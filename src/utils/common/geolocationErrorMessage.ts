/**
 * GeolocationPositionError의 메시지를 얻는다.
 */
export function geolocationErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      return "위치 권한을 허용해 주세요.";
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      return "현재 위치를 조회할 수 없습니다.";
    case GeolocationPositionError.TIMEOUT:
      return "위치 조회 시간이 초과되었습니다.";
    default:
      return "위치 기능을 사용할 수 없습니다.";
  }
}
