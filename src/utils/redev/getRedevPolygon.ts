import { RedevGeometry } from "@/models/redev";
import { redevMapColors } from "./redevMapColors";

export interface RedevPolygonOptions {
  redev: RedevGeometry;
  map?: kakao.maps.Map;
  onClick: () => void;
  under1km?: boolean;
}

export function getRedevPolygon({ redev, map, onClick, under1km = false }: RedevPolygonOptions) {
  const points = redev.geometry_points.map(
    (point) => new window.kakao.maps.LatLng(point.y, point.x)
  );

  const color = redev.is_newtown ? redevMapColors.green : redevMapColors.blue;

  // 면 투명도
  const newTownOpacity = under1km ? 0.12 : 0.4;
  const redevOpacity = under1km ? 0.4 : 0;
  const fillOpacity = redev.is_newtown ? newTownOpacity : redevOpacity;

  // 선 투명도
  const strokeOpacity = redev.is_newtown ? 1 : 0;

  const polygon = new window.kakao.maps.Polygon({
    path: points,
    fillColor: color,
    fillOpacity,
    strokeColor: color,
    strokeOpacity,
    strokeWeight: 1,
  });

  kakao.maps.event.addListener(polygon, "click", onClick);

  polygon.setMap(map ?? null);

  return polygon;
}
