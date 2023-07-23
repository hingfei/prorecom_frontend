import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import UserForm from '../../views/sign-up/UserForm'
import { FormProvider, useForm } from 'react-hook-form'
import UserTypeForm from 'src/views/sign-up/UserTypeForm'
import { CardContent } from '@mui/material'
import JobSeekerForm from '../../views/sign-up/JobSeekerForm'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import CompanyForm from 'src/views/sign-up/CompanyForm'
import { getFormInputValues } from '../../@core/utils/get-form-input-values'
import { useCreateCompanyMutation, useCreateJobSeekerMutation } from '../../graphql/api'
import { onCompleted, onError } from '../../@core/utils/response'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '38rem' }
}))

/**
 * Component: RegisterPage
 *
 * This component provides a multistep user registration form.
 * Users can choose their user type, fill in their details,
 * and submit the form to create a job seeker or company account.
 */
const RegisterPage = () => {
  const router = useRouter()
  const [steps, setSteps] = useState(1)
  const [selected, setSelected] = useState<'job_seeker' | 'company'>()
  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = formMethods

  // GraphQL mutations to create a new job seeker or company
  const [createJobSeeker, { loading: jobSeekerLoading }] = useCreateJobSeekerMutation({
    onCompleted: data => {
      onCompleted(data?.createJobSeeker, () => {
        router.push('/login')
      })
    },
    onError: error => {
      onError(error, undefined, setError)
    }
  })

  const [createCompany, { loading: companyLoading }] = useCreateCompanyMutation({
    onCompleted: data => {
      onCompleted(data?.createCompany, () => {
        router.push('/login')
      })
    },
    onError: error => {
      onError(error, undefined, setError)
    }
  })

  // Handle form submission for creating a new user (job seeker or company)
  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)

    if (selected === 'job_seeker') {
      createJobSeeker({
        variables: {
          input: input
        }
      })
    } else if (selected === 'company') {
      createCompany({
        variables: {
          input: input
        }
      })
    }
  }

  // Function to change the current step of the registration process
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
                <img src='/images/prorecom_title.png' alt='pro_recom' />
              </Box>
              {steps === 1 ? (
                // Render the UserTypeForm component to choose the user type (job seeker or company)
                <UserTypeForm onClick={changeStep} selected={selected} setSelected={setSelected} />
              ) : steps === 2 ? (
                // Render the UserForm component to capture user details (shared between job seekers and companies)
                <UserForm onClick={changeStep} />
              ) : steps === 3 ? (
                selected === 'job_seeker' ? (
                  // Render the JobSeekerForm component to capture job seeker specific details
                  <JobSeekerForm
                    changeStep={changeStep}
                    onClick={handleSubmit(onSubmit)}
                    isSubmitting={jobSeekerLoading || isSubmitting}
                  />
                ) : (
                  // Render the CompanyForm component to capture company specific details
                  <CompanyForm
                    changeStep={changeStep}
                    onClick={handleSubmit(onSubmit)}
                    isSubmitting={companyLoading || isSubmitting}
                  />
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
