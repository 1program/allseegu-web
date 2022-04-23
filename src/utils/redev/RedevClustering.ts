import { opacify } from "polished";

import { css } from "@emotion/css";

import { MarkerClustering } from "../naver-maps/MarkerClustering";
import { redevMapColors } from "./redevMapColors";
import { zoomPresets } from "./zoomPresets";

const styles = {
  circle: (size: number) =>
    css({
      width: size,
      height: size,
      borderRadius: size,
      fontSize: size / 2.5,
      backgroundColor: opacify(0.3, redevMapColors.blue),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      opacity: 0.7,
      transform: `translate(-50%, -50%)`,
      color: "white",
      letterSpacing: "-0.05em",
    }),
};

export class RedevClustering extends MarkerClustering {
  constructor(map: naver.maps.Map) {
    super({
      map,
      gridSize: 160,
      maxZoom: zoomPresets["10km"],
      minClustererSize: 1,
      markers: [],
      icons: [{ content: "<div></div>" }],
      stylingFunction: RedevClustering.stylingFunction,
    });
  }

  static stylingFunction(marker: naver.maps.Marker, count: number) {
    const element = (marker as any).getElement();
    element.innerHTML = RedevClustering.getHtml(count);
  }

  static getHtml(count: number) {
    const size = Math.max(35, count * 1.3);

    return `
      <div class="${styles.circle(size)}">${count}</div>
    `;
  }
}
