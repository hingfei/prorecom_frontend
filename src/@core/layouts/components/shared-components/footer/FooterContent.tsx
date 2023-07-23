import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * FooterContent is a functional component that represents the content of the website's footer.
 * It displays the copyright information along with the current year and the website name.
 *
 * @returns {JSX.Element} The JSX element representing the content of the footer.
 */
const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ mr: 2 }}>{`© ${new Date().getFullYear()}, ProRecom`}</Typography>
    </Box>
  )
}

export default FooterContent
