/*
카카오맵 사용에 도움을 주는 헬퍼 함수들입니다.
*/

/**
 * 좌표로부터 카카오맵 바운더리를 구한다.
 * @param bounds 카카오맵 좌표 배열
 * @returns 카카오맵 바운드
 */
export function boundsFromLatLngs(list: globalThis.kakao.maps.LatLng[]) {
  const bounds = new window.kakao.maps.LatLngBounds();

  list.forEach((latLng) => bounds.extend(latLng));

  return bounds;
}

/**
 * 주어진 카카오맵 바운드로부터 중심점을 구한다.
 * @param bounds 카카오맵 바운드
 * @returns 카카오맵 좌표
 */
export function centerFromBounds(bounds: globalThis.kakao.maps.LatLngBounds) {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  return new window.kakao.maps.LatLng(
    (ne.getLat() + sw.getLat()) / 2,
    (ne.getLng() + sw.getLng()) / 2
  );
}

export default 1;
