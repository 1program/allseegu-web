export const chunkArray = <T>(array: T[], size = 2) => {
  const newArray = [...array];
  const results = [];

  while (newArray.length) {
    results.push(newArray.splice(0, size));
  }

  return results;
};
