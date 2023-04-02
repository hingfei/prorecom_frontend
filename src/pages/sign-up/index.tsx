import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import UserForm from '../../views/sign-up/UserForm'
import { FormProvider, useForm } from 'react-hook-form'
import UserTypeForm from 'src/views/sign-up/UserTypeForm'
import { CardContent, Typography } from '@mui/material'
import JobSeekerForm from "../../views/sign-up/JobSeekerForm";
import themeConfig from "../../configs/themeConfig";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import CompanyForm from 'src/views/sign-up/CompanyForm'
import { getFormInputValues } from "../../@core/utils/get-form-input-values";

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '38rem' }
}))

const RegisterPage = () => {
  const theme = useTheme()
  const [steps, setSteps] = useState(1)
  const [selected, setSelected] = useState<'job_seeker' | 'company'>()
  const formMethods = useForm({
    // defaultValues: {
    //   ...defaultValues
    // }
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
    reset,
    control
  } = formMethods

  const onSubmit = (values: any) => {
    console.log(values)
    const input = getFormInputValues(values)
    console.log('input', input)
  }

  const changeStep = (val: number) => {
    setSteps(val)
  }

  // @ts-ignore
  return (
    // @ts-ignore
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={'80vh'}>
          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.5rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              {steps === 1 ? (
                <UserTypeForm onClick={changeStep} selected={selected} setSelected={setSelected} />
              ) : steps === 2 ? (
                <UserForm onClick={changeStep} />
              ) : steps === 3 ? (
                selected === 'job_seeker' ? (
                  <JobSeekerForm changeStep={changeStep} onClick={handleSubmit(onSubmit)} />
                ) : (
                  <CompanyForm changeStep={changeStep} onClick={handleSubmit(onSubmit)} />
                )
              ) : (
                ''
              )}
            </CardContent>
          </Card>
        </Box>
      </form>
    </FormProvider>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
