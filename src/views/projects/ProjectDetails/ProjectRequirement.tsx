import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ViewListOutline } from 'mdi-material-ui'

const ProjectRequirement = ({ projectReq }: { projectReq: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <ViewListOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Project Requirement
          </Typography>
        </Box>
        <Typography variant={'body1'}>{projectReq}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectRequirement
