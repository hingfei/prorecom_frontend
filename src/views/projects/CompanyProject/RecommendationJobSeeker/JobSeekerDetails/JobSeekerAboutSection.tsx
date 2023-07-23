import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { InformationOutline } from 'mdi-material-ui'

/**
 * JobSeekerAboutSection Component
 *
 * This component displays the job seeker's about section, including their self-description and gender-specific title.
 *
 * @param {Object} props - The component props.
 * @param {string | null | undefined} props.seekerAbout - The self-description of the job seeker.
 * @param {string | undefined | null} props.gender - The gender of the job seeker.
 * @returns {JSX.Element} The JobSeekerAboutSection component.
 */
const JobSeekerAboutSection = ({
  seekerAbout,
  gender
}: {
  seekerAbout: string | null | undefined
  gender: string | undefined | null
}) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <InformationOutline sx={{mr: 2}}/>
          <Typography variant={'h6'} fontWeight={600} >
            {gender === 'male' ? 'About Him' : 'About Her'}
          </Typography>
        </Box>
        <Typography variant={'body1'}>{seekerAbout ?? 'No information is provided.'}</Typography>
      </CardContent>
    </Card>
  )
}

export default JobSeekerAboutSection
