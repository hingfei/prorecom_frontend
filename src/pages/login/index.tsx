// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, Theme, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Icons Imports
// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { getFormInputValues } from '../../@core/utils/get-form-input-values'
import { PasswordInput, TextInput } from '../../@core/components/custom-inputs'
import { PasswordComponent } from '../../views/sign-up/UserForm'
import { Grid } from '@mui/material'
import { useAuth } from '../../@core/context/authContext'
import useMediaQuery from "@mui/material/useMediaQuery";
import { authConfig } from "../../configs/auth";

// ** Demo Imports

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const PasswordComponent = () => {
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

const LoginPage = () => {
  const { handleLogin } = useAuth()
  const formMethods = useForm()

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting }
  } = formMethods

  const router = useRouter()

  useEffect(() => {
    const sessionToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (sessionToken) {
      router.push('/projects')
    }
  }, [])


  const onSubmit = async (values: any) => {
    const input = getFormInputValues(values)

    await handleLogin(input.userName, input.password)
  }

  return (
    <FormProvider {...formMethods}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={'80vh'}>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src='/images/prorecom_title.png' alt="pro_recom"/>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography variant='body2'>Please sign-in to your account and start the journey</Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                inputProps={{
                  label: 'Username',
                  sx: { marginBottom: 4 }
                }}
                controllerProps={{
                  control,
                  name: 'userName'
                }}
                isRequired
              />
              <PasswordComponent />

              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7, marginTop: 5 }}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  New on our platform?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/sign-up'>
                    <LinkStyled>Create an account</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
        {/*<FooterIllustrationsV1/>*/}
      </Box>
    </FormProvider>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
