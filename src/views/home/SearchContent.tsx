import { styled } from '@mui/material/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { TextInput } from 'src/@core/components/custom-inputs'
import { useRouter } from 'next/router'
import { Magnify } from 'mdi-material-ui'
import { BoxProps } from '@mui/material/Box'

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
  maxWidth: '780px',
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

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 276
  }
}))

const SearchContent = () => {
  const router = useRouter()
  const formMethods = useForm({
    defaultValues: {
      ...defaultValues
    }
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
    control
  } = formMethods

  const onSubmit = (values: any) => {
    console.log({ values })
    // const { user_mobile, user_alternative_mobile, ...restValues } = values;
    // createUser({
    //   variables: {
    //     input: {
    //       ...getFormInputValues(restValues),
    //       user_mobile: user_mobile?.charAt(0) === '6' ? user_mobile : `6${user_mobile}`,
    //       ...(!!user_alternative_mobile
    //         ? {
    //           user_alternative_mobile:
    //             user_alternative_mobile?.charAt(0) === '6' ? user_alternative_mobile : `6${user_alternative_mobile}`
    //         }
    //         : {})
    //     }
    //   }
    // });
  }

  return (
    // @ts-ignore
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxWrapper>
          <TitleWrapper>
            <Typography fontWeight={800} variant={'h2'} marginBottom={9}>
              Building better teams, one recommendation at a time
            </Typography>
            <Typography variant={'h6'}>
              Unlock your potential with personalized project and candidate recommendations.
            </Typography>
          </TitleWrapper>
          <SearchWrapper>
            <TextInput
              inputProps={{
                label: 'Search',
                placeholder: 'Search for your project...',
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
          {/*<Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>*/}
          {/*  <Img src={'/images/homepage/job_searching.jpg'} alt={'home_img'} width={'500px'} height={'auto'} />*/}
          {/*</Grid>*/}
        </BoxWrapper>
      </form>
    </FormProvider>
  )
}

export default SearchContent
