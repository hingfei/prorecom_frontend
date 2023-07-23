// ** MUI Imports
import { PaletteMode } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

/**
 * ModeToggler Component is a functional component that represents a mode toggler icon button.
 * It allows users to toggle between light mode and dark mode.
 *
 * @param {Object} props - The props object that contains the following properties:
 * @param {Settings} props.settings - The settings object containing various configuration settings.
 * @param {(values: Settings) => void} props.saveSettings - A function to save the updated settings.
 *
 * @returns {JSX.Element} The JSX element representing the mode toggler icon button.
 */
interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const ModeToggler = (props: Props) => {
  // ** Props
  const { settings, saveSettings } = props

  // Handles the mode change when the mode toggler icon button is clicked.
  const handleModeChange = (mode: PaletteMode) => {
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  // ** The ModeToggler component renders an IconButton with an icon representing the current mode (light or dark).
  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      {settings.mode === 'dark' ? <WeatherSunny /> : <WeatherNight />}
    </IconButton>
  )
}

export default ModeToggler
