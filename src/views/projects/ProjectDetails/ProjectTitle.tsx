import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import { ProjectType } from '../../../graphql/api'
import { capitalizeFirstLetter } from '../../../@core/utils/capitalize-first-letter'
import { CalendarMonthOutline, CurrencyUsd, Domain, MapMarkerOutline } from 'mdi-material-ui'

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
        <Box display={'flex'} alignItems={'center'}>
          <Domain fontSize={'small'} sx={{ mr: 1, alignSelf: 'flex-start' }} />
          <Box>
            <Typography variant={'body1'}>{project?.company?.companyName ?? '-'}</Typography>
            <Typography variant={'body2'}>
              {project?.company?.companySize
                ? `${capitalizeFirstLetter(project?.company?.companySize)} enterprise`
                : ''}
            </Typography>
          </Box>
        </Box>
        <Typography variant={'body1'}>{project?.company?.companyFounder}</Typography>
      </Box>

      <Box pb={5}>
        <Box display={'flex'} alignItems={'center'}>
          <MapMarkerOutline fontSize={'small'} sx={{ mr: 1, alignSelf: 'flex-start' }} />
          <Box>
            <Typography variant={'body2'}>{project?.company?.companyStreet}</Typography>
            <Typography variant={'body2'}>{project?.company?.companyCity}</Typography>
            <Typography variant={'body2'}>{project?.company?.companyState}</Typography>
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Chip
          size='medium'
          variant='outlined'
          label={project?.projectTypes}
          color='primary'
          sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
        />
        <Box display={'flex'} alignItems={'center'}>
          <CurrencyUsd fontSize={'small'} sx={{ mr: 1 }} />
          {project?.projectMinSalary != null && project?.projectMaxSalary != null ? (
            <Typography variant={'body2'}>
              RM{project?.projectMinSalary} - RM{project?.projectMaxSalary}
            </Typography>
          ) : project?.projectMinSalary != null && project?.projectMaxSalary == null ? (
            <Typography variant={'body2'}>RM{project?.projectMinSalary}</Typography>
          ) : (
            <Typography variant={'body2'}>Undisclosed</Typography>
          )}
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
        <CalendarMonthOutline fontSize={'small'} sx={{ mr: 1 }} />
        <Typography variant={'body2'}>
          {project?.postDates}
        </Typography>
      </Box>
    </>
  )
}

export default ProjectTitle
