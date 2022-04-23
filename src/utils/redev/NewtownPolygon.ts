import { RedevGeometry } from "@/models/redev";

import { redevMapColors } from "./redevMapColors";
import { zoomPresets } from "./zoomPresets";

export class NewtownPolygon extends naver.maps.Polygon {
  constructor(redev: RedevGeometry, map: naver.maps.Map) {
    super({
      map,
      visible: NewtownPolygon.getVisible(map.getZoom()),
      fillColor: redevMapColors.green,
      fillOpacity: NewtownPolygon.getOpacity(map.getZoom()),
      strokeColor: redevMapColors.green,
      strokeOpacity: 1,
      strokeWeight: 1,
      paths: redev.geometry_points.map((point) => new naver.maps.LatLng(point.y, point.x)),
    });

    map.addListener("zoom_changed", () => {
      const zoom = map.getZoom();
      this.setOptions("visible", NewtownPolygon.getVisible(map.getZoom()));
      this.setOptions("fillOpacity", NewtownPolygon.getOpacity(zoom));
    });
  }

  /**
   * 10km 이상 (10 이하): trie
   * 1km 이상 10km 미만 (10 초과 13 이하): false
   */
  static getVisible(zoom: number) {
    if (zoom <= zoomPresets["10km"]) {
      return false;
    }

    return true;
  }

  /**
   * 1km 이상 ~ 10km 미만 까지 : 지도에는 타운컬러(녹색 도형)만 노출되며, 타운과 구역의 이름/아이콘 모두 노출되는데 구역 이름/아이콘은 살짝 투명도를 주어 타운이 더 잘보이도록 합니다.
   * 0 ~ 1km 미만 까지 : 지도에 타운컬러(녹색)은 좀더 투명해지면서, 구역컬러(파랑 도형)이 등장?합니다. 타운과 구역 이름/아이콘이 모두 진하게 노출됩니다.
   */
  /**
   * 1km 이상 (10 초과 13 이하): 0.4
   * 1km 미만 (13 초과): 0.12
   */
  static getOpacity(zoom: number) {
    if (zoom > zoomPresets["10km"]) {
      return 0.4;
    }

    return 0.12;
  }
}
