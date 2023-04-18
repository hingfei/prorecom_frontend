import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const ProjectRequirement = ({ projectReq }: { projectReq: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Typography variant={'h6'} fontWeight={600} pb={4}>
          Project Requirement
        </Typography>
        <Typography variant={'body2'}>{projectReq}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectRequirement
