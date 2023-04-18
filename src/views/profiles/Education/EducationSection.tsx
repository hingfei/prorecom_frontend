import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType, eduLevelSelect, fieldStudySelect } from '../../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'

// ** Styled Components
const TextBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const EducationSection = ({ edu, seekerId }: { edu: string | null | undefined; seekerId: string | undefined }) => {
  const dispatch = useAppDispatch()
  const education = JSON.parse(edu)

  const convertEducLevel = (level: number) => {
    const result = eduLevelSelect.find(item => item.value === level)
    if (result) {
      return result.label
    }

    return '-'
  }

  const convertFieldofStudy = (field: number) => {
    const result = fieldStudySelect.find(item => item.value === field)
    if (result) {
      return result.label
    }

    return '-'
  }

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Education
        </Typography>
        <Button
          variant={'contained'}
          onClick={() =>
            dispatch(
              setDrawerState({
                isOpen: true,
                type: DrawerType.editEducationForm,
                content: seekerId
              })
            )
          }
        >
          Edit
        </Button>
      </Box>
      {education ? (
        <Box width={'100%'} display={'flex'} flexDirection={'column'} rowGap={'16px'}>
          <TextBox>
            <Typography variant='body1'>Education Institution</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {education.educationInstitution ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Education Level</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {convertEducLevel(education.educationLevel) ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Field of Study</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {convertFieldofStudy(education.fieldOfStudy) ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Graduation Year</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {education.graduationYear ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Description</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {education.description ?? '-'}
            </Typography>
          </TextBox>
        </Box>
      ) : (
        <Typography variant={'body2'}>Add your education now</Typography>
      )}
    </Box>
  )
}

export default EducationSection
