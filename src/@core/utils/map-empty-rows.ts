/**
 * Function to map empty rows with unique IDs based on the specified number of rows.
 *
 * @param {number} numberOfRows - The number of empty rows to be created. If not provided, defaults to 4.
 * @returns {Array} An array of empty row objects, each containing a unique 'id' property.
 */
export const mapEmptyRows = (numberOfRows?: number) => {
  return [...Array(numberOfRows || 4)].map((_, i) => {
    return { id: i + 1 };
  });
};
