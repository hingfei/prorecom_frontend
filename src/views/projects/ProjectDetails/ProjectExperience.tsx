import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { StarCheckOutline } from 'mdi-material-ui'

const ProjectExperience = ({ projectExpLvl }: { projectExpLvl: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <StarCheckOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Experience Level
          </Typography>
        </Box>
        <Typography variant={'body2'}>{projectExpLvl}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectExperience
