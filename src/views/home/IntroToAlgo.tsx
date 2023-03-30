import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Check } from 'mdi-material-ui/'
import { useRouter } from 'next/router'

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 276
  }
}))

const SearchContent = () => {
  const router = useRouter()

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
        <Typography variant={'h4'} fontWeight={700} mb={4}>
          Help you to get the best job that fits you
        </Typography>
        <Box display={'flex'} sx={{ width: '100%', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 4 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'body1'} fontWeight={700}>
                    Analysing your skillset
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'body1'} fontWeight={700}>
                    Extracting skillset provided
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'body1'} fontWeight={700}>
                    Matching the skillset from projects
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'body1'} fontWeight={700}>
                    Recommend projects matched the most for you
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
        <Button
          variant={'outlined'}
          size={'large'}
          sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }}
          onClick={() => router.push('/sign-up')}
        >
          Get started now
        </Button>
      </Grid>
    </Grid>
  )
}

export default SearchContent
