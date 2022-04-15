import h from "hyperscript";
import { css } from "@emotion/css";

import { RedevGeometry } from "@/models/redev";
import redevIcon from "@/images/icons/redev-icon.svg";
import { redevMapColors } from "./redevMapColors";

const redevOverlayCss = css({
  cursor: "pointer",
  userSelect: "none",
  textAlign: "center",
});

const topCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 3,
});

const iconCss = css({
  display: "inline-flex",
  width: 20,
  height: 20,
  borderRadius: 20,
  border: "1px solid white",
  alignItems: "center",
  justifyContent: "center",
});

const redevIconCss = css({
  display: "block",
  width: 10,
  height: 10,
});

const iconDotCss = css({
  display: "block",
  width: 5,
  height: 5,
  borderRadius: 5,
  backgroundColor: "white",
});

const contentCss = css({
  position: "relative",
  fontSize: 13,
  lineHeight: 1,
});

const strokeCss = css({
  WebkitTextStroke: "4px white",
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
  under1km?: boolean;
}

export function getRedevOverlay({ redev, map, onClick, under1km = false }: RedevOverlayOptions) {
  const center = new window.kakao.maps.LatLng(
    parseFloat(redev.center_y),
    parseFloat(redev.center_x)
  );

  const color = redev.is_newtown ? redevMapColors.green : redevMapColors.blue;

  const fontSize = redev.is_newtown ? 20 : 13;

  const opacity = under1km === false && redev.is_newtown === 0 ? 0.6 : 1;

  const content = h(
    "div",
    {
      className: css(redevOverlayCss, { opacity }),
      onclick: onClick,
    },
    [
      h(
        "div",
        { className: topCss },
        h("div", { className: css(iconCss, { backgroundColor: color }) }, [
          redev.is_newtown
            ? h("div", { className: iconDotCss })
            : h("img", { className: redevIconCss, src: redevIcon }),
        ])
      ),
      h("div", { className: contentCss }, [
        h("div", { className: css(strokeCss, { fontSize }) }, redev.title),
        h("div", { className: css(textCss, { fontSize, color }) }, redev.title),
      ]),
    ]
  );

  const customOverlay = new window.kakao.maps.CustomOverlay({
    content,
    xAnchor: 0.5,
    yAnchor: 0.5,
    position: center,
    map,
  });

  return customOverlay;
}
