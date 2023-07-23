import { styled } from '@mui/material/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { TextInput } from 'src/@core/components/custom-inputs'
import { useRouter } from 'next/router'
import { Magnify } from 'mdi-material-ui'
import { BoxProps } from '@mui/material/Box'
import { getFormInputValues } from '../../@core/utils/get-form-input-values'
import { useEffect, useState } from "react";
import { useAuth } from "../../@core/context/authContext";

const defaultValues = {
  keyword: ''
}

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}))

const TitleWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '900px',
  textAlign: 'center'
}))

const SearchWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'unset'
  },
  display: 'flex',
  marginTop: 36,
  justifyContent: 'center',
  gap: 20
}))

/**
 * SearchContent Component
 *
 * This component displays the search content section on the homepage. It includes a title,
 * description, and a search input field. The search input is used for job seekers to search for projects.
 */
const SearchContent = () => {
  const [userType, setUserType] = useState('job_seekers');
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const formMethods = useForm({
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, control } = formMethods

  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)
    router.push({ pathname: '/projects', query: { keywords: input.keyword } })
  }

  useEffect(() => {
    const data = window.localStorage.getItem('userData')
    if (data) {
      const userData = JSON.parse(data)
      setUserType(userData.userType)
    } else {
      setUserType('job_seekers')
    }
  }, [isAuthenticated]);


  return (
    // @ts-ignore
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxWrapper>
          <TitleWrapper>
            <Typography fontWeight={800} variant={'h2'} marginBottom={9}>
              Building better teams <br /> One recommendation at a time
            </Typography>
            <Typography variant={'h6'}>
              Unlock your potential with personalized project and candidate recommendations.
            </Typography>
          </TitleWrapper>
          {userType === 'job_seekers' ? (
            <SearchWrapper>
              <TextInput
                inputProps={{
                  label: 'Search',
                  placeholder: 'Search project',
                  autoComplete: 'off'
                  // sx: {width: '50px'}
                }}
                controllerProps={{
                  control,
                  name: 'keyword'
                }}
              />
              <Button variant={'contained'} startIcon={<Magnify />} onClick={handleSubmit(onSubmit)}>
                Search
              </Button>
            </SearchWrapper>
          ) : (
            ''
          )}
        </BoxWrapper>
      </form>
    </FormProvider>
  )
}

export default SearchContent
