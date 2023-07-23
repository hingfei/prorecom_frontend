import { fieldStudySelect } from '../../constants'

/**
 * convertFieldofStudy function takes a number as input and returns the corresponding field of study label from the 'fieldStudySelect' constant array.
 *
 * @param {number | undefined | null} field - The input number representing the field of study.
 *
 * @returns {string} The label of the corresponding field of study or a hyphen ('-') if the field is not found.
 */
export const convertFieldofStudy = (field: number | undefined | null): string => {
  // Find the corresponding field of study object in the 'fieldStudySelect' constant array based on the input field
  const result = fieldStudySelect.find(item => item.value === field)

  // If the corresponding field of study is found, return its label
  if (result) {
    return result.label
  }

  // If the field is not found, return a hyphen ('-')
  return '-'
}
