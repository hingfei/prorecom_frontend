import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const ProjectDescription = ({ projectDesc }: { projectDesc: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Typography variant={'h6'} fontWeight={600} pb={4}>
          Project Description
        </Typography>
        <Typography variant={'body2'}>{projectDesc}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectDescription
