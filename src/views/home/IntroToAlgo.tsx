import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Check } from 'mdi-material-ui/'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../@core/context/authContext'

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 276
  }
}))

const IntroToAlgo = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isAuthenticated: useAuthAuthenticated, logout, handleLogin } = useAuth()

  useEffect(() => {
    const checkAuth = () => {
      if (!useAuthAuthenticated) {
        setIsAuthenticated(false)
      } else {
        const data = window.localStorage.getItem('userData')
        if (data) {
          setIsAuthenticated(true)
        }
      }
    }

    checkAuth()
  }, [logout, handleLogin])

  return (
    <Grid container spacing={6} sx={{ alignItems: 'center' }}>
      <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Img src={'/images/homepage/skill_list.png'} alt={'home_img'} width={'500px'} height={'auto'} />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
      >
        <Typography variant={'h4'} fontWeight={600} mb={4}>
          Discover Your Dream Projects with Our Skill-Based Recommendation System.
        </Typography>
        <Box display={'flex'} sx={{ width: '100%', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 6 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'h6'} fontWeight={500}>
                    Unleashing Your Potential
                  </Typography>
                }
                secondary={<Typography variant={'body1'}>Analyzing and Matching Your Skills</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'h6'} fontWeight={500}>
                    Crafting Your Perfect Profile
                  </Typography>
                }
                secondary={<Typography variant={'body1'}>Skill Extraction and Curation</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'h6'} fontWeight={500}>
                    Discover Your Dream Project
                  </Typography>
                }
                secondary={<Typography variant={'body1'}>Skill Matching and Recommendation</Typography>}
              />
            </ListItem>
          </List>
        </Box>
        {!isAuthenticated && (
          <Button
            variant={'outlined'}
            size={'large'}
            sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }}
            onClick={() => router.push('/sign-up')}
          >
            Get started now
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export default IntroToAlgo
