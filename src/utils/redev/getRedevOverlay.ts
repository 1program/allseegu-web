import { RedevGeometry } from "@/models/redev";
import { css } from "@emotion/css";
import h from "hyperscript";
import { redevMapColors } from "./redevMapColors";

const redevOverlayCss = css({
  cursor: "pointer",
  userSelect: "none",
  position: "relative",
  fontSize: 13,
});

const strokeCss = css({
  WebkitTextStroke: "3px white",
});

const textCss = css({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export interface RedevOverlayOptions {
  redev: RedevGeometry;
  map?: kakao.maps.Map;
  onClick?: () => void;
}

export function getRedevOverlay({ redev, map, onClick }: RedevOverlayOptions) {
  const center = new window.kakao.maps.LatLng(
    parseFloat(redev.center_y),
    parseFloat(redev.center_x)
  );

  const color = redev.is_newtown ? redevMapColors.blue : redevMapColors.green;

  const content = h("div", { className: redevOverlayCss, onclick: onClick }, [
    h("div", { className: strokeCss }, redev.title),
    h("div", { className: css(textCss, { color }) }, redev.title),
  ]);

  const customOverlay = new window.kakao.maps.CustomOverlay({
    content,
    xAnchor: 0.5,
    yAnchor: 0.5,
    position: center,
    map,
  });

  return customOverlay;
}
