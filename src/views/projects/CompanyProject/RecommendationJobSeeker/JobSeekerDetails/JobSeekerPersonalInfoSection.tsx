import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { JobSeekerType } from '../../../../../graphql/api'
import { generateGenderIcon } from '../../../../../@core/utils/generate-gender-icon'
import { MapMarkerOutline, PhoneOutline } from 'mdi-material-ui'

const JobSeekerPersonalInfoSection = ({ jobSeeker }: { jobSeeker: JobSeekerType | undefined }) => {
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant={'h5'} fontWeight={700} mr={2}>
            {jobSeeker?.seekerName ?? '-'}
          </Typography>
          <Typography variant={'body1'}> {generateGenderIcon(jobSeeker?.seekerGender)}</Typography>
        </Box>
        <Button variant={'contained'}>Invite</Button>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
        <Typography variant={'body1'}>{jobSeeker?.seekerAge + ' Years old'}</Typography>
        <Box display={'flex'} alignItems={'center'}>
          <PhoneOutline fontSize={'small'} sx={{ mr: 1 }} />
          <Typography variant={'body1'}>+60{jobSeeker?.seekerPhoneNo}</Typography>
        </Box>
      </Box>
      <Typography variant={'body2'} pb={2}></Typography>
      <Box pb={5} display={'flex'} alignItems={'center'}>
        <MapMarkerOutline fontSize={'small'} sx={{ mr: 1 }} />
        <Typography variant={'body2'}>
          {jobSeeker?.seekerStreet}, {jobSeeker?.seekerCity}, {jobSeeker?.seekerState}
        </Typography>
      </Box>
    </>
  )
}

export default JobSeekerPersonalInfoSection
