export function generateMobileNumber() {
  const first = Math.random() * (9999 - 100 + 100);
  const second = Math.random() * (9999 - 1000 + 1000);
  return `010-${first}-${second}`;
}
