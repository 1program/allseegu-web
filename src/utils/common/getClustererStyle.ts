export function getClustererStyle(size: number) {
  return {
    userSelect: "none",
    backgroundColor: "rgba(22, 112, 254, 0.70)",
    color: "white",
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: `${size / 2}px`,
    lineHeight: 1,
    fontSize: `${size / 3}px`,
  };
}
