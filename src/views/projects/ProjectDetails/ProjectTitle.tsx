import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import { ProjectType } from '../../../graphql/api'

const ProjectTitle = ({ project }: { project: ProjectType | undefined }) => {
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          {project?.projectName ?? '-'}
        </Typography>
        <Button variant={'contained'}>Apply</Button>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
        <Typography variant={'body1'}>{project?.company?.companyName ?? '-'}</Typography>
        <Typography variant={'body1'}>{project?.company?.companyFounder}</Typography>
      </Box>
      <Typography variant={'body2'} pb={2}>
        {project?.company?.companySize ? `${project?.company?.companySize} employer` : ''}
      </Typography>
      <Box pb={5}>
        <Typography variant={'body2'}>{project?.company?.companyStreet}</Typography>
        <Typography variant={'body2'}>{project?.company?.companyCity}</Typography>
        <Typography variant={'body2'}>{project?.company?.companyState}</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Chip
          size='medium'
          variant='outlined'
          label={project?.projectTypes}
          color='primary'
          sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
        />
        <Typography variant={'body2'}>{project?.projectSalary}</Typography>
      </Box>
      <Typography variant={'body2'} textAlign={'end'}>
        {project?.postDates}
      </Typography>
    </>
  )
}

export default ProjectTitle
