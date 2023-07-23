import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Box, List, ListItem, ListItemIcon, ListItemProps, ListItemText, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { CircleMedium } from 'mdi-material-ui'

// ** Styled Components
const ListItemStyled = styled(ListItem)<ListItemProps>(({ theme }) => ({
  padding: theme.spacing(1, 0)
}))

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  component: 'img',
  objectFit: 'contain',
  padding: '30px 0',
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 130
}))

/**
 * IntroToProRecom Component
 *
 * This component displays the section explaining the steps to use the recommendation system.
 * It includes three cards explaining the process of creating an account, completing the profile, and getting recommendations.
 */
const IntroToProRecom = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Box maxWidth={'650px'}>
          <Typography variant={'h4'} textAlign={'center'} fontWeight={600} marginBottom={11}>
            Unlocking the Magic: Behind the Scenes of Our Recommendation System
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} md={3.5} display={'flex'} justifyContent={'center'}>
          <Card>
            <CardMediaStyled component={'img'} alt={'account'} image='/images/homepage/user.png' />
            <CardContent>
              <Typography variant='h6'>Create Account</Typography>
              <List>
                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant={'body1'}>Get started with ProRecom</Typography>} />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant={'body1'}>Join our community and find the best projects</Typography>}
                  />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant={'body1'}>Start your project journey with ProRecom</Typography>}
                  />
                </ListItemStyled>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3.5} display={'flex'} justifyContent={'center'}>
          <Card>
            <CardMediaStyled component={'img'} alt={'profile'} image='/images/homepage/resume.png' />
            <CardContent>
              <Typography variant='h6'>Complete Profile Details</Typography>
              <List>
                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant={'body1'}>Let us know your skills and interests</Typography>}
                  />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant={'body1'}>Personalize your recommendations</Typography>} />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant={'body1'}>Unlock your project potential with a complete profile</Typography>
                    }
                  />
                </ListItemStyled>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3.5} display={'flex'} justifyContent={'center'}>
          <Card>
            <CardMediaStyled component={'img'} alt={'recommend'} image='/images/homepage/quality.png' />
            <CardContent>
              <Typography variant='h6'>Get Recommendation</Typography>
              <List>
                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant={'body1'}>Discover the perfect project for you</Typography>}
                  />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant={'body1'}>Let us match you with your dream project</Typography>}
                  />
                </ListItemStyled>

                <ListItemStyled>
                  <ListItemIcon>
                    <CircleMedium />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant={'body1'}>Get project recommendations tailored just for you</Typography>
                    }
                  />
                </ListItemStyled>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IntroToProRecom
