import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { InformationOutline } from "mdi-material-ui";

const ProjectDescription = ({ projectDesc }: { projectDesc: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <InformationOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Project Description
          </Typography>
        </Box>
        <Typography variant={'body2'}>{projectDesc}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectDescription
