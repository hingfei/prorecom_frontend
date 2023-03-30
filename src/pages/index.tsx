import SearchContent from '../views/home/SearchContent'
import IntroToProRecom from 'src/views/home/IntroToProRecom'
import IntroToAlgo from 'src/views/home/IntroToAlgo'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Styled Components
const BoxSection = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 0)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(11, 0)
  }
}))

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
        <IntroToAlgo />
      </BoxSection>
    </>
  )
}

export default Home
