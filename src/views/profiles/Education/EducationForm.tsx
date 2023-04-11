import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { SelectInput, TextInput } from '../../../@core/components/custom-inputs'
import { eduLevelSelect, fieldStudySelect } from '../../../constants'

const EducationForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{ label: 'Education Level' }}
          controllerProps={{
            control,
            name: 'educationLevel'
          }}
          selectData={eduLevelSelect}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Education Institution' }}
          controllerProps={{
            control,
            name: 'educationInstitution'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{
            label: 'Field of Study'
          }}
          controllerProps={{
            control,
            name: 'fieldOfStudy'
          }}
          selectData={fieldStudySelect}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Graduation Year' }}
          controllerProps={{
            control,
            name: 'graduationYear'
          }}
          isNumber
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Description', multiline: true }}
          controllerProps={{
            control,
            name: 'description'
          }}
        />
      </Grid>

      <Box display='flex' justifyContent='center' py={10}>
        <Button
          variant='contained'
          sx={{
            mr: 2
          }}
          {...props}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
        <Button onClick={onCancel} color='secondary' variant='outlined'>
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default EducationForm
