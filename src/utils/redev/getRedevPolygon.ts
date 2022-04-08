import { RedevGeometry } from "@/models/redev";
import { redevMapColors } from "./redevMapColors";

export interface RedevPolygonOptions {
  redev: RedevGeometry;
  map?: kakao.maps.Map;
  onClick: () => void;
}

export function getRedevPolygon({ redev, map, onClick }: RedevPolygonOptions) {
  const points = redev.geometry_points.map(
    (point) => new window.kakao.maps.LatLng(point.y, point.x)
  );

  const polygonColor = redev.is_newtown ? redevMapColors.blue : redevMapColors.green;

  const polygon = new window.kakao.maps.Polygon({
    path: points,
    fillColor: polygonColor,
    fillOpacity: 0.6,
    strokeColor: polygonColor,
    strokeOpacity: 1,
    strokeWeight: 1,
  });

  kakao.maps.event.addListener(polygon, "click", onClick);

  polygon.setMap(map ?? null);

  return polygon;
}
