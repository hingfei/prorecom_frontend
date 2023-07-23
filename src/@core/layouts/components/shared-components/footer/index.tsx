// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Footer Content Component
import FooterContent from './FooterContent'

/**
 * Footer Component is a functional component that represents the website's footer.
 * It displays the content at the bottom of the page and can be customized using props.
 *
 * @param {Object} props - The props object that contains the following properties:
 * @param {Settings} props.settings - The settings object containing various configuration settings.
 * @param {(values: Settings) => void} props.saveSettings - A function to save the updated settings.
 * @param {(props?: any) => ReactNode} props.footerContent - A custom function to render the footer content.
 *
 * @returns {JSX.Element} The JSX element representing the website's footer.
 */
interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
  footerContent?: (props?: any) => ReactNode
}

const Footer = (props: Props) => {
  // ** Props
  const { settings, footerContent: userFooterContent } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  // ** The Footer component is a container that displays the website's footer content.
  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          width: '100%',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: theme.spacing(12, 6),
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } })
        }}
      >
        {/* The userFooterContent prop allows users to provide their own custom footer content, otherwise the default FooterContent component is used. */}
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  )
}

export default Footer
