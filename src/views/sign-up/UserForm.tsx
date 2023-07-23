import { useEffect, useState } from 'react'
import { PasswordInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

/**
 * PasswordComponent Component
 *
 * This component displays a password input field with a toggle button to show or hide the password.
 * The component is designed to be used in a user registration or login form.
 *
 * @returns {JSX.Element} The PasswordComponent component.
 */
export const PasswordComponent = () => {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  // @ts-ignore
  return (
    <>
      <Grid item mb={4}>
        <PasswordInput
          inputProps={{ label: 'Password' }}
          controllerProps={{
            control,
            name: 'password'
          }}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          isRequired
        />
      </Grid>
    </>
  )
}

/**
 * UserForm Component
 *
 * This component displays a form to collect user login credentials, including username, email, and password.
 * The form provides validation for required fields and checks if the form is filled to enable the "Next" button.
 *
 * @param {Object} props - The component props.
 * @param {Function} [props.onClick] - The function to handle the click event on the "Back" and "Next" buttons.
 * @returns {JSX.Element} The UserForm component.
 */
const UserForm = ({ onClick }: { onClick?: (val: number) => void }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { control, getValues, watch } = useFormContext()
  const userName = watch('userName')
  const userEmail = watch('userEmail')
  const password = watch('password')

  useEffect(() => {
    isFormFilled()
  }, [userName, userEmail, password])

  const isFormFilled = () => {
    const formValues = getValues()
    if (formValues.userName && formValues.userEmail && formValues.password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  return (
    <>
      <Box sx={{ mb: 6 }}>
        <Typography variant='subtitle1' fontWeight={600}>
          Fill in the user login credential:
        </Typography>
      </Box>
      <TextInput
        inputProps={{
          label: 'Username',
          sx: { marginBottom: 4 }
        }}
        controllerProps={{
          control,
          name: 'userName'
        }}
        isAutofocus
        isRequired
      />
      <TextInput
        inputProps={{
          label: 'Email',
          sx: { marginBottom: 4 }
        }}
        controllerProps={{
          control,
          name: 'userEmail'
        }}
        isRequired
      />
      <PasswordComponent />
      <Box display='flex' justifyContent='center' sx={{ marginBottom: 7, marginTop: 5 }}>
        <Button
          fullWidth
          color='primary'
          variant='outlined'
          sx={{
            mr: 2
          }}
          onClick={() => onClick(1)}
          size={'large'}
        >
          Back
        </Button>
        <Button fullWidth variant='contained' onClick={() => onClick(3)} size={'large'} disabled={isDisabled}>
          Next
        </Button>
      </Box>
    </>
  )
}

export default UserForm
