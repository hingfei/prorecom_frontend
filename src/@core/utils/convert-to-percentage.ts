/**
 * convertToPercentage function takes a number as input and returns its value as a formatted percentage string.
 *
 * @param {number | null | undefined} val - The input number to be converted to a percentage.
 *
 * @returns {string} The input number as a formatted percentage string. If the input is null or undefined, it returns an empty string.
 */
export const convertToPercentage = (val: number | null | undefined) => {
  // Multiply by 100 to get the percentage value
  const percentageValue = val * 100

  // Round down the percentage value to remove decimal places
  const roundedPercentage = Math.round(percentageValue)

  // Format the rounded percentage value with the percentage symbol
  const formattedPercentage = roundedPercentage + '%'

  return formattedPercentage
}
