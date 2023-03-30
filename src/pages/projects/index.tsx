// ** MUI Imports
// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import

// ** Demo Components Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Grid } from '@mui/material'

// ** Styled Components
const BoxSection = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 0)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(11, 0)
  }
}))

const Projects = () => {
  return <>
    <Grid>
      <Grid>
        Project list
      </Grid>
      <Grid>
        Project detail
      </Grid>
    </Grid>
  </>
}

export default Projects
