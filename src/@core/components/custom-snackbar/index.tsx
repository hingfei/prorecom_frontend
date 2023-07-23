import { Alert, AlertColor, Snackbar } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'

// ---------------------------------------------------------
// ShowAlert Component
// ---------------------------------------------------------

// This component is a reusable Snackbar-based Alert that displays a message with different severity levels.
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
  // Determine the title based on the alertType for the Alert component.
  let alertTitle = 'Success'
  if (alertType === 'error') {
    alertTitle = 'Error'
  } else if (alertType === 'warning') {
    alertTitle = 'Warning'
  } else if (alertType === 'info') {
    alertTitle = 'Info'
  } else if (alertType === 'success') {
    alertTitle = 'Success'
  }

  // The Alert displays the provided message with the specified severity level.
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
