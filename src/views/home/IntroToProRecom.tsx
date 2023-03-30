import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { BoxProps } from '@mui/material/Box'


const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}))

const IntroToProRecom = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Typography variant={'h4'} fontWeight={700} marginBottom={7}>
          How It Works
        </Typography>
      </Grid>
      <Grid container spacing={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} sm={3} display={'flex'} justifyContent={'center'}>
          <BoxWrapper>
            <Typography variant={'body1'} textAlign={'center'}>
              Register An Account
            </Typography>
          </BoxWrapper>
        </Grid>
        <Grid item xs={12} sm={3} display={'flex'} justifyContent={'center'}>
          <BoxWrapper>
            <Typography variant={'body1'} textAlign={'center'}>
              Complete Your Profile Details
            </Typography>
          </BoxWrapper>
        </Grid>
        <Grid item xs={12} sm={3} display={'flex'} justifyContent={'center'}>
          <BoxWrapper sx={{ width: { xs: '50%', sm: '100%' } }}>
            <Typography variant={'body1'} textAlign={'center'}>
              Voila! Get Recommended Projects That Are Perfectly Match For You
            </Typography>
          </BoxWrapper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IntroToProRecom
