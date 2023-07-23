import { eduLevelSelect } from '../../constants'

/**
 * convertEducLevel function takes a number as input and returns the corresponding education level label from the 'eduLevelSelect' constant array.
 *
 * @param {number | undefined | null} level - The input number representing the education level.
 *
 * @returns {string} The label of the corresponding education level or a hyphen ('-') if the level is not found.
 */
export const convertEducLevel = (level: number | undefined | null): string => {
  // Find the corresponding education level object in the 'eduLevelSelect' constant array based on the input level
  const result = eduLevelSelect.find(item => item.value === level)

  // If the corresponding education level is found, return its label
  if (result) {
    return result.label
  }

  // If the level is not found, return a hyphen ('-')
  return '-'
}
