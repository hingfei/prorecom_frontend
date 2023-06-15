import Box from '@mui/material/Box'
import { styled, Theme, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Settings } from 'src/@core/context/settingsContext'
// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useAuth } from '../../../@core/context/authContext'
import { useEffect, useState } from 'react'
import { BriefcaseOutline, ViewDashboardOutline } from 'mdi-material-ui'
import { useCompanyDetailLazyQuery, useJobSeekerDetailLazyQuery } from "../../../graphql/api";
import { onError } from "../../../@core/utils/response";

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

// ** Styled Components
const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const AppBarContent = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUsername] = useState()
  const [userType, setUserType] = useState()
  const [profilePic, setProfilePic] = useState(null);
  const { isAuthenticated: useAuthAuthenticated, logout, handleLogin } = useAuth()


  const router = useRouter()

  const [fetchJobSeeker] = useJobSeekerDetailLazyQuery({
    onCompleted: data => {
      setProfilePic(data?.jobSeekerDetail?.seekerProfilePic)
    },
    onError: error => {
      router.push('/404')
      onError(error, undefined)
    }
  })

  const [fetchCompany] = useCompanyDetailLazyQuery({
    onCompleted: data => {
      setProfilePic(data?.companyDetail?.companyProfilePic)
    },
    onError: error => {
      router.push('/404')
      onError(error, undefined)
    }
  })

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
          setUsername(userData?.userName)
          setUserType(userData?.userType)
          if (userData?.userType === 'job_seekers') {
            fetchJobSeeker({ variables: { seekerId: parseInt(userData.userId) } })
          } else {
            fetchCompany({ variables: { companyId: parseInt(userData.userId) } })
          }
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
            <img src='/images/prorecom_title.png' alt='pro_recom' width={230} height={'auto'} />
          </StyledLink>
        </Link>
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
            {userType === 'job_seekers' ? (
              <IconButton color='inherit' onClick={() => router.push('/projects')}>
                <BriefcaseOutline />
              </IconButton>
            ) : (
              <IconButton color='inherit' onClick={() => router.push('/company-dashboard')}>
                <ViewDashboardOutline />
              </IconButton>
            )}
            <NotificationDropdown />
            <UserDropdown handleLogout={handleLogout} userType={userType} userName={userName} profilePic={profilePic}/>
          </>
        )}

        {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}
      </Box>
    </Box>
  )
}

export default AppBarContent
