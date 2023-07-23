import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

// Styled Components
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 276
  }
}))

/**
 * IntroToVision Component
 *
 * This component displays the section highlighting the purpose of the application,
 * which is to make the job search process easier with intelligent project and candidate recommendations.
 * It includes an image illustrating the job search process and a descriptive text.
 */
const IntroToVision = () => {
  return (
    <Grid
      container
      spacing={6}
      sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column-reverse', md: 'row' } }}
    >
      <Grid
        item
        xs={12}
        md={5}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
      >
        <Typography variant={'h4'} fontWeight={600} mb={4} sx={{ textAlign: { xs: 'center', md: 'start' } }}>
          Making the job search process easier with intelligent project and candidate recommendations.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Img src={'/images/homepage/job_searching.jpg'} alt={'home_img'} width={'500px'} height={'auto'} />
      </Grid>
    </Grid>
  )
}

export default IntroToVision
