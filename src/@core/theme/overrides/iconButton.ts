// ** MUI Imports
import { Theme } from '@mui/material/styles'

const IconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            // backgroundColor: 'transparent',
            color: theme.palette.primary.main
          }
        }
      }
    }
  }
}

export default IconButton
