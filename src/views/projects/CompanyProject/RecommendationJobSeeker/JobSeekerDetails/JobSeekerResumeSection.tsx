import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { BookAccountOutline } from 'mdi-material-ui'

const JobSeekerResumeSection = ({
                                 resume,
                               }: {
  resume: any
}) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <BookAccountOutline sx={{mr: 2}}/>
          <Typography variant={'h6'} fontWeight={600} >
            Resume
          </Typography>
        </Box>
        <Typography variant={'body1'}>{resume ?? 'No information is provided.'}</Typography>
      </CardContent>
    </Card>
  )
}

export default JobSeekerResumeSection
