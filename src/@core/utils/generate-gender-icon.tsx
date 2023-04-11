import { GenderFemale, GenderMale } from 'mdi-material-ui'

export const generateGenderIcon = (gender: any) => {
  switch (gender) {
    case 'female':
      return <GenderFemale sx={{ color: '#EF448B', fontSize: 21 }} />
    case 'male':
      return <GenderMale sx={{color: '#27AEEB', fontSize: 20 }} />
    default:
      return null
  }
}
