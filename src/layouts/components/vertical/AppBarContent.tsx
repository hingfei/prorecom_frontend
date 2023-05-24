// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, Theme, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icons Imports

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import themeConfig from '../../../configs/themeConfig'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useAuth } from '../../../@core/context/authContext'
import { authConfig } from '../../../configs/auth'
import { useEffect, useState } from 'react'
import { BriefcaseOutline } from 'mdi-material-ui'
import Tooltip from "@mui/material/Tooltip";

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

// ** Styled Components
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

const AppBarContent = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState()
  const [userName, setUsername] = useState()
  const { isAuthenticated: useAuthAuthenticated, logout, handleLogin } = useAuth()
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const theme = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const checkAuth = () => {
      if (!useAuthAuthenticated) {
        setIsAuthenticated(false)
      } else {
        const data = window.localStorage.getItem('userData')
        if (data) {
          const userData = JSON.parse(data)
          setUserId(userData?.userId)
          setUsername(userData?.userName)
          setIsAuthenticated(true)
        }
      }
    }

    checkAuth()
  }, [logout, handleLogin])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Link href='/' passHref>
          <StyledLink>
            <img src='/images/prorecom_title.png' alt="pro_recom" width={230} height={'auto'}/>
          </StyledLink>
        </Link>
        {/*{hidden ? (*/}
        {/*  <IconButton*/}
        {/*    color='inherit'*/}
        {/*    onClick={toggleNavVisibility}*/}
        {/*    sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}*/}
        {/*  >*/}
        {/*    <Menu />*/}
        {/*  </IconButton>*/}
        {/*) : null}*/}
        {/*<TextField*/}
        {/*  size='small'*/}
        {/*  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}*/}
        {/*  InputProps={{*/}
        {/*    startAdornment: (*/}
        {/*      <InputAdornment position='start'>*/}
        {/*        <Magnify fontSize='small' />*/}
        {/*      </InputAdornment>*/}
        {/*    )*/}
        {/*  }}*/}
        {/*/>*/}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {!isAuthenticated ? (
          <>
            <Button size='medium' variant='outlined' onClick={() => router.push('/login')} sx={{ mr: 2 }}>
              Sign In
            </Button>
            <Button size='medium' variant='contained' onClick={() => router.push('/sign-up')}>
              Join Now
            </Button>
          </>
        ) : (
          <>
            <IconButton color='inherit' onClick={() => router.push('/projects')}>
                <BriefcaseOutline />
            </IconButton>
            <NotificationDropdown />
            <UserDropdown handleLogout={handleLogout} userId={userId} userName={userName} />
          </>
        )}

        {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}
      </Box>
    </Box>
  )
}

export default AppBarContent
