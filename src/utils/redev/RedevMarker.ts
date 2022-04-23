import { RedevGeometry } from "@/models/redev";
import { css } from "@emotion/css";

import { redevMapColors } from "./redevMapColors";
import { zoomPresets } from "./zoomPresets";

const styles = {
  box: css({
    cursor: "pointer",
    position: "relative",
    userSelect: "none",
    backgroundColor: redevMapColors.blue,
    border: `1px solid ${redevMapColors.darkerBlue}`,
    padding: "4px 10px",
    borderRadius: "4px",
    color: "white",
    textAlign: "center",
    transform: `translate(-50%, -100%)`,
    boxShadow: `0 3px 6px rgba(0,0,0,0.2)`,
    paddingBottom: "7px",
    zIndex: 1,
  }),
  title: css({
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    fontSize: "13px",
  }),
  description: css({
    whiteSpace: "nowrap",
    color: redevMapColors.lighterBlue,
    fontSize: 11,
  }),
  tail: css({
    position: "absolute",
    bottom: -7,
    left: "calc(50% - 6px)",
    backgroundColor: redevMapColors.blue,
    border: `1px solid ${redevMapColors.darkerBlue}`,
    borderTopWidth: 0,
    borderRightWidth: 0,
    width: 12,
    height: 12,
    borderRadius: 2,
    transform: `rotate(-45deg)`,
  }),
};

/**
 * opacity를 지도 zoom에 따라 동적으로 조절해야 함으로,
 * `naver.maps.OverlayView`를 사용한다.
 */
export class RedevMarker extends naver.maps.OverlayView {
  redev;

  element;

  position;

  constructor(redev: RedevGeometry, onClick: () => void) {
    super();
    this.redev = redev;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.innerHTML = RedevMarker.getHtml(redev);
    this.position = new naver.maps.LatLng(parseFloat(redev.center_y), parseFloat(redev.center_x));
    this.element.addEventListener("click", onClick);
  }

  onAdd() {
    const { overlayLayer } = this.getPanes();

    overlayLayer.appendChild(this.element);
  }

  draw() {
    const map = this.getMap();

    if (map == null) {
      return;
    }

    const zoom = map.getZoom();

    const projection = this.getProjection();
    const pixel = projection.fromCoordToOffset(this.position);

    this.element.style.top = `${pixel.y}px`;
    this.element.style.left = `${pixel.x}px`;
    this.element.style.opacity = (zoom <= zoomPresets["1km"] ? 0.6 : 1).toString();
  }

  onRemove() {
    this.element.remove();
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: naver.maps.LatLng) {
    this.position = position;
  }

  static getHtml(redev: RedevGeometry) {
    const title = redev.title.replace("\\n", "\n");

    return `
      <div class="${styles.box}">
        <div class="${styles.title}">${title}</div>
        <div class="${styles.description}">재개발 / 1,413명</div>
        <div class="${styles.tail}"></div>
      </div>
    `;
  }
}
