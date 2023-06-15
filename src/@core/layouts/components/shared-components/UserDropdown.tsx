// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = ({
  handleLogout,
  userType,
  userName,
  profilePic
}: {
  handleLogout: () => void
  userType: any
  userName: string
  profilePic: string | null
}) => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const logout = () => {
    handleLogout()
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='avatar'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
        >
          <Box
            component='img'
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover'
            }}
            src={profilePic ? `/images/profile-pics/${profilePic}` : '/images/avatars/1.png'}
            alt='avatar'
          />
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                alt='avatar'
                sx={{ width: '2.5rem', height: '2.5rem' }}
              >
                <Box
                  component='img'
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                  src={profilePic ? `/images/profile-pics/${profilePic}` : '/images/avatars/1.png'}
                  alt='avatar'
                />
              </Avatar>
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{userName}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={
            userType === 'job_seekers'
              ? () => handleDropdownClose('/profiles')
              : () => handleDropdownClose('/company-profiles')
          }
        >
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        {/*<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>*/}
        {/*  <Box sx={styles}>*/}
        {/*    <EmailOutline sx={{ marginRight: 2 }} />*/}
        {/*    Inbox*/}
        {/*  </Box>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>*/}
        {/*  <Box sx={styles}>*/}
        {/*    <MessageOutline sx={{ marginRight: 2 }} />*/}
        {/*    Chat*/}
        {/*  </Box>*/}
        {/*</MenuItem>*/}
        <Divider />
        {userType === 'job_seekers' && (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/applications-history')}>
            <Box sx={styles}>
              <FileDocumentOutline sx={{ marginRight: 2 }} />
              Applications History
            </Box>
          </MenuItem>
        )}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => logout()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
