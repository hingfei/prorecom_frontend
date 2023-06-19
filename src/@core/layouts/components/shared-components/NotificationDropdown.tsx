// ** React Imports
import { Fragment, ReactNode, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { GetUserNotificationsDocument, useMarkNotificationAsReadMutation } from '../../../../graphql/api'
import dayjs from 'dayjs'
import Badge from '@mui/material/Badge'
import { useAuth } from '../../../context/authContext'

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const { notif } = useAuth()

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (notifId?: string) => {
    if (notifId) {
      readNotif({
        variables: {
          notificationId: parseInt(notifId)
        }
      })
    } else {
      setAnchorEl(null)
    }
  }

  const [readNotif] = useMarkNotificationAsReadMutation({
    refetchQueries: [GetUserNotificationsDocument]
  })

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  return (
    <Fragment>
      {notif.unreadCount !== 0 ? (
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <Badge badgeContent={notif.unreadCount} color={'error'}>
            <BellOutline />
          </Badge>
        </IconButton>
      ) : (
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <BellOutline />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={`${notif.unreadCount ?? '0'} New`}
              color={notif.unreadCount == undefined || notif.unreadCount == 0 ? 'secondary' : 'primary'}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        {notif?.notifications && notif?.notifications.length > 0 ? (
          <ScrollWrapper>
            {notif?.notifications.map(notif => {
              return (
                <MenuItem
                  key={notif.notificationId}
                  onClick={() => handleDropdownClose(notif.notificationId)}
                  sx={{
                    backgroundColor: notif.isRead ? 'inherit' : 'rgba(163,246,241,0.19)',
                    '&:hover': {
                      backgroundColor: notif.isRead ? 'inherit' : 'rgba(163,246,241,0.3)'
                    }
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{notif.message}</MenuItemTitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled', textAlign: 'right' }}>
                      {dayjs(notif?.createdAt).format('DD MMM')}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
          </ScrollWrapper>
        ) : (
          <MenuItem onClick={() => handleDropdownClose()}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>No notification</MenuItemTitle>
              </Box>
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
