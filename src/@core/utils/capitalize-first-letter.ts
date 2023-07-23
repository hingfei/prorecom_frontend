/**
 * capitalizeFirstLetter function takes a string as input and returns a new string with the first letter capitalized.
 *
 * @param {string | null | undefined} str - The input string that needs to be capitalized.
 *
 * @returns {string} The new string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string | null | undefined): string => {
  // Check if the input string is null or undefined
  if (str === null || str === undefined) {
    return '-'
  }

  // Capitalize the first letter of the input string and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1)
}
