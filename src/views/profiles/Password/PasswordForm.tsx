import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { PasswordInput } from '../../../@core/components/custom-inputs'
import { useState } from 'react'

/**
 * PasswordForm Component
 *
 * This component provides a form to enter the current password and the new password. It uses the `PasswordInput` component
 * from `custom-inputs` to render password input fields. The form allows the user to toggle the visibility of the password
 * using the `showPassword` and `showConfirmPassword` states. The form can be used for both editing the password and adding
 * a new password. It takes a `isEdit` prop to indicate if it is used for editing or adding. When the form is submitted, the
 * `onSubmit` function is called. The `onCancel` function is used to close the drawer.
 *
 * @param {ButtonProps & { isEdit?: boolean }} props - The component props. It includes the `isEdit` prop to indicate if it's for editing or adding.
 * @returns {JSX.Element} The password form component.
 */
const PasswordForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { control } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <PasswordInput
          inputProps={{ label: 'Current Password' }}
          controllerProps={{
            control,
            name: 'currentPassword'
          }}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          isRequired
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <PasswordInput
          inputProps={{ label: 'New Password' }}
          controllerProps={{
            control,
            name: 'newPassword'
          }}
          showPassword={showConfirmPassword}
          toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          isRequired
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

export default PasswordForm
