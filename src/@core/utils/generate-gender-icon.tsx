import { GenderFemale, GenderMale } from 'mdi-material-ui'

/**
 * Function to generate a gender icon based on the provided gender.
 *
 * @param {string} gender - The gender value (e.g., 'female', 'male').
 * @returns {JSX.Element | null} The gender icon element as JSX or null if the gender value is not recognized.
 */
export const generateGenderIcon = (gender: string): JSX.Element | null => {
  switch (gender) {
    case 'female':
      // Return a GenderFemale icon element with custom styles for the color and font size.
      return <GenderFemale sx={{ color: '#EF448B', fontSize: 21 }} />
    case 'male':
      // Return a GenderMale icon element with custom styles for the color and font size.
      return <GenderMale sx={{ color: '#27AEEB', fontSize: 20 }} />
    default:
      // Return null if the gender value is not recognized.
      return null
  }
}
