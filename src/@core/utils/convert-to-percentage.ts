export const convertToPercentage = (val: number | null | undefined) => {
  // Multiply by 100 to get the percentage value
  const percentageValue = val * 100

  // Round down the percentage value to remove decimal places
  const roundedPercentage = Math.round(percentageValue)

  // Format the rounded percentage value with the percentage symbol
  const formattedPercentage = roundedPercentage + '%'

  return formattedPercentage
}
