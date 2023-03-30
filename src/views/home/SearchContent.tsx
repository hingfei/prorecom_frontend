import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Typography } from '@mui/material'
import { TextInput } from 'src/@core/components/custom-inputs'

const defaultValues = {
  keyword: ''
}

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 276
  }
}))

const SearchContent = () => {
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
    console.log("run")
    console.log({ values });
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
  };

  return (
    // @ts-ignore
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center' }}>
          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <Typography variant={'h3'} fontWeight={900} marginBottom={7}>
              Find the dream project that you love.
            </Typography>
            <Grid
              container
              spacing={6}
              flexDirection={'row'}
              alignItems={'center'}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Grid item xs={6}>
                <TextInput
                  inputProps={{
                    label: 'Search',
                    placeholder: 'Search for your project...'
                    // sx: {width: '50px'}
                  }}
                  controllerProps={{
                    control,
                    name: 'keyword'
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant='contained' size={'large'} sx={{padding:'12px 28px !important'}} onClick={handleSubmit(onSubmit)}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Img src={'/images/homepage/job_searching.jpg'} alt={'home_img'} width={'500px'} height={'auto'} />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default SearchContent
