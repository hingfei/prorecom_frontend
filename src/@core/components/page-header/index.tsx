// ** MUI Imports
import { Box, Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

// ** Types
import { PageHeaderProps } from './index.d'

const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle, href, linkTitle, onLinkClick } = props
  const router = useRouter()

  return (
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: { sm: '90%' } }}>
          {!!title && (
            <Typography noWrap variant='h5'>
              {title}
            </Typography>
          )}

          {subtitle || null}
        </Box>
        <Box>
          {!!linkTitle && (
            <Button
              sx={{ mb: 2 }}
              onClick={() => {
                !!href && router?.push(href)
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
