// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import { useRouter } from "next/router";
import Link from "next/link";
import themeConfig from "../../configs/themeConfig";
import Typography, { TypographyProps } from "@mui/material/Typography";

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  '& .content-center-no-padding': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const HeaderStyle = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: 64,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 6)
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {router.pathname == '/login' || router.pathname == '/sign-up' ?
          <HeaderStyle>
            <Link href='/' passHref>
              <StyledLink>
                <img src='/images/prorecom_title.png' alt="pro_recom" width={230} height={'auto'}/>
              </StyledLink>
            </Link>
          </HeaderStyle>
          : ''}

        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
