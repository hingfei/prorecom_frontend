import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const ProjectExperience = ({ projectExpLvl }: { projectExpLvl: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Typography variant={'h6'} fontWeight={600} pb={4}>
          Experience Level
        </Typography>
        <Typography variant={'body2'}>{projectExpLvl}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectExperience
