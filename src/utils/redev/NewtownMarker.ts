import redevIcon from "@/images/icons/redev-icon.svg";
import { RedevGeometry } from "@/models/redev";
import { css } from "@emotion/css";

import { redevMapColors } from "./redevMapColors";

const styles = {
  box: css({
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  }),
  top: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  }),
  circle: css({
    display: "inline-flex",
    width: 20,
    height: 20,
    borderRadius: 20,
    border: "1px solid white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: redevMapColors.green,
  }),
  icon: css({
    display: "block",
    width: 10,
    height: 10,
  }),
  content: css({
    position: "relative",
    fontSize: 20,
    lineHeight: 1.38, // 26px / 26px
    wordBreak: "keep-all",
  }),
  stroke: css({
    WebkitTextStroke: "4px white",
    whiteSpace: "pre-line",
  }),
  text: css({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    whiteSpace: "pre-line",
    color: redevMapColors.green,
  }),
};

export class NewtownMarker extends naver.maps.Marker {
  constructor(redev: RedevGeometry) {
    super({
      position: { lat: parseFloat(redev.center_y), lng: parseFloat(redev.center_x) },
      icon: {
        content: NewtownMarker.getHtml(redev),
      },
    });
  }

  static getHtml(redev: RedevGeometry) {
    const title = redev.title.replace("\\n", "\n");

    return `
      <div class="${styles.box}">
        <div class="${styles.top}">
          <div class="${styles.circle}">
            <img class="${styles.icon}" src="${redevIcon}" />
          </div>
        </div>
        <div class="${styles.content}">
          <div class="${styles.stroke}">${title}</div>
          <div class="${styles.text}">${title}</div>
        </div>
      </div>
    `;
  }
}
