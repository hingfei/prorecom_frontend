import { useEffect, useState } from 'react'
import { PasswordInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const PasswordComponent = () => {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

      {/*<Grid item mb={4}>*/}
      {/*  <PasswordInput*/}
      {/*    inputProps={{ label: 'Re-enter Password' }}*/}
      {/*    controllerProps={{*/}
      {/*      control,*/}
      {/*      name: 'confirm_password'*/}
      {/*    }}*/}
      {/*    showPassword={showConfirmPassword}*/}
      {/*    toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}*/}
      {/*    isRequired*/}
      {/*  />*/}
      {/*</Grid>*/}
    </>
  )
}

const UserForm = ({ onClick }: { onClick?: (val: number) => void }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { control, getValues, watch } = useFormContext()
  const username = watch('user_name')
  const user_email = watch('user_email')
  const password = watch('password')

  useEffect(() => {
    isFormFilled()
  }, [username, user_email, password])

  const isFormFilled = () => {
    const formValues = getValues()
    if (formValues.user_name && formValues.user_email && formValues.password) {
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
          name: 'user_name'
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
          name: 'user_email'
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
