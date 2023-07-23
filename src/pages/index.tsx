import SearchContent from '../views/home/SearchContent'
import IntroToProRecom from 'src/views/home/IntroToProRecom'
import IntroToAlgo from 'src/views/home/IntroToAlgo'
import IntroToVision from '../views/home/IntroToVision'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Styled Components
const BoxSection = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 0)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(16, 0)
  }
}))

/**
 * Component: Home
 *
 * This component represents the home page of the application.
 * It renders different sections of content, including search content, introductions to various topics, etc.
 */
const Home = () => {
  return (
    <>
      <BoxSection>
        <SearchContent />
      </BoxSection>
      <BoxSection>
        <IntroToProRecom />
      </BoxSection>
      <BoxSection>
        <IntroToVision />
      </BoxSection>
      <BoxSection>
        <IntroToAlgo />
      </BoxSection>
    </>
  )
}

export default Home
