// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  '& .content-center-no-padding': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
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

/**
 * BlankLayout component represents a layout with a blank canvas, ideal for login or sign-up pages.
 * It includes a header at the top with a clickable logo to navigate to the home page.
 *
 * @param {object} props - The props object that contains the following property:
 * @param {ReactNode} props.children - The children to be rendered inside the BlankLayout.
 *
 * @returns {JSX.Element} The JSX element representing the BlankLayout component.
 */
const BlankLayout = ({ children }: BlankLayoutProps) => {
  const router = useRouter()

  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {router.pathname == '/login' || router.pathname == '/sign-up' ? (
          <HeaderStyle>
            <Link href='/' passHref>
              <StyledLink>
                <img src='/images/prorecom_title.png' alt='pro_recom' width={230} height={'auto'} />
              </StyledLink>
            </Link>
          </HeaderStyle>
        ) : (
          ''
        )}

        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
