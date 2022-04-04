/**
 * smaller가 larger에 포함된 영역인지 확인
 */
export function checkContainsBounds(
  larger: kakao.maps.LatLngBounds,
  smaller: kakao.maps.LatLngBounds
) {
  return larger.contain(smaller.getSouthWest()) && larger.contain(smaller.getNorthEast());
}
