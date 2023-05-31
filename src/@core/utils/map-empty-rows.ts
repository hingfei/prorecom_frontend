export const mapEmptyRows = (numberOfRows?: number) => {
  return [...Array(numberOfRows || 4)].map((_, i) => {
    return { id: i + 1 };
  });
};
