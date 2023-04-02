import { Alert, AlertColor, Snackbar } from '@mui/material'
import { useState } from 'react'
import AlertTitle from "@mui/material/AlertTitle";

const ShowAlert = ({
  open,
  onClose,
  message,
  alertType
}: {
  open?: boolean
  onClose?: () => void
  message?: string
  alertType: AlertColor
}) => {
  let alertTitle = 'Success';
  if (alertType === 'error') {
    alertTitle = 'Error'
  } else if (alertType === 'warning') {
    alertTitle = 'Warning'
  } else if (alertType === 'info') {
    alertTitle = 'Info'
  } else if (alertType === 'success') {
    alertTitle = 'Success'
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={alertType} sx={{ width: '100%' }}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ShowAlert
