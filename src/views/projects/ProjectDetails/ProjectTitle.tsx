import React, { useEffect, useState } from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import {
  GetJobSeekerApplicationsDocument,
  ProjectListingDocument,
  ProjectType,
  SearchProjectsDocument,
  useCreateApplicationMutation,
  useSendNotificationMutation
} from '../../../graphql/api'
import { capitalizeFirstLetter } from '../../../@core/utils/capitalize-first-letter'
import { CalendarMonthOutline, CurrencyUsd, Domain, MapMarkerOutline } from 'mdi-material-ui'
import { onCompleted, onError } from '../../../@core/utils/response'
import dayjs from 'dayjs'

/**
 * ProjectTitle Component
 *
 * This component displays the details of a project's title, company information,
 * location, project type, salary, and post date. It also handles the "Apply" button logic.
 *
 * @param {Object} props - The component props.
 * @param {ProjectType | undefined} props.project - The project object that includes the project details.
 * @param {Array} props.applications - The list of job seeker applications.
 * @param {Object} props.jobSeeker - The job seeker information.
 * @returns {JSX.Element} The ProjectTitle component.
 */
const ProjectTitle = ({
  project,
  applications,
  jobSeeker
}: {
  project: ProjectType | undefined
  applications: any
  jobSeeker: any
}) => {
  const [buttonTitle, setButtonTitle] = useState('Apply')
  const [isProjectApplied, setIsProjectApplied] = useState(false)

  const [createApplication, { loading }] = useCreateApplicationMutation({
    variables: {
      projectId: parseInt(project?.projectId)
    },
    onCompleted: data => {
      sendNotif({
        variables: {
          input: {
            senderId: parseInt(jobSeeker?.seekerId),
            receiverId: parseInt(project?.companyId),
            message: `${jobSeeker?.seekerName} has applied ${project?.projectName}`
          }
        }
      })
      setButtonTitle('Applied')
      setIsProjectApplied(true)
      onCompleted(data?.createApplication, undefined)
    },
    onError: error => onError(error),
    refetchQueries: [ProjectListingDocument, GetJobSeekerApplicationsDocument, SearchProjectsDocument]
  })

  const [sendNotif] = useSendNotificationMutation()

  const handleApply = () => {
    createApplication()
  }

  useEffect(() => {
    applications.some(application => {
      if (parseInt(application.projectId) === parseInt(project?.projectId)) {
        if (application.applicationIsInvited) {
          setButtonTitle('Invited')
        } else {
          setButtonTitle('Applied')
        }
        setIsProjectApplied(true)

        return true
      }
      setButtonTitle('Apply')
      setIsProjectApplied(false)

      return false
    })
  }, [project])

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          {project?.projectName ?? '-'}
        </Typography>
        <Button variant={'contained'} onClick={handleApply} disabled={loading || isProjectApplied}>
          {buttonTitle}
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={2}>
        <Box display={'flex'} alignItems={'center'}>
          <Domain fontSize={'small'} sx={{ mr: 1, alignSelf: 'flex-start' }} />
          <Box>
            <Link href={`/company-profiles?id=${project?.companyId}`} target={'_blank'} underline={'hover'}>
              <Typography variant={'body1'}>{project?.company?.companyName ?? '-'}</Typography>
            </Link>
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
            <Typography variant={'body1'}>{project?.company?.companyStreet}</Typography>
            <Typography variant={'body1'}>{project?.company?.companyCity}</Typography>
            <Typography variant={'body1'}>{project?.company?.companyState}</Typography>
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
            <Typography variant={'body1'}>
              RM{project?.projectMinSalary} - RM{project?.projectMaxSalary}
            </Typography>
          ) : project?.projectMinSalary != null && project?.projectMaxSalary == null ? (
            <Typography variant={'body1'}>RM{project?.projectMinSalary}</Typography>
          ) : (
            <Typography variant={'body1'}>Undisclosed</Typography>
          )}
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
        <CalendarMonthOutline fontSize={'small'} sx={{ mr: 1 }} />
        <Typography variant={'body1'}>{dayjs(project?.postDates).format('DD MMM YYYY')}</Typography>
      </Box>
    </>
  )
}

export default ProjectTitle
