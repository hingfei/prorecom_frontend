// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Spinner Component
// This component displays the spinner when loading a page
const Spinner = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  )
}

export default Spinner
