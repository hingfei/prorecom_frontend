import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { TextInput } from '../../../@core/components/custom-inputs'

/**
 * AboutForm Component
 *
 * This component renders a form for users to add or edit their "About" section.
 *
 * @param {boolean} isEdit (Optional) Flag to indicate if the form is for editing (true) or adding (false) "About" content.
 * @param {ButtonProps} props (Optional) Additional props to pass to the main Button element of the form.
 * @returns {JSX.Element} The form component for adding/editing the "About" section.
 */
const AboutForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{
            label: 'About',
            placeholder: 'Write something about yourself',
            multiline: true
          }}
          controllerProps={{
            control,
            name: 'seekerAbout'
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

export default AboutForm
