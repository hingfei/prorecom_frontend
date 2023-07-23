// ** MUI Imports
import { Box, Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

// ** Types
import { PageHeaderProps } from './index.d'

// PageHeader Component
// This component renders a header for a page with a title, subtitle, and an optional link button.
const PageHeader = (props: PageHeaderProps) => {
  // Destructure the props
  const { title, subtitle, href, linkTitle, onLinkClick } = props
  const router = useRouter()

  return (
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: { sm: '90%' } }}>
          {/* Render the title if provided */}
          {!!title && (
            <Typography noWrap variant='h5'>
              {title}
            </Typography>
          )}

          {/* Render the subtitle if provided */}
          {subtitle || null}
        </Box>
        <Box>
          {/*Render the link button if linkTitle is provided */}
          {!!linkTitle && (
            <Button
              sx={{
                mb: 2,
                whiteSpace: 'noWrap',
                display: 'inline-block',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              variant='contained'
              onClick={() => {
                // Push to the provided href using Next.js router
                !!href && router?.push(href)
                // Call the onLinkClick function if provided
                !!onLinkClick && onLinkClick()
              }}
            >
              {linkTitle}
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  )
}

export default PageHeader
