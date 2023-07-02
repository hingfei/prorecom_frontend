import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {
  JobSeekerType,
  ProjectApplicationType,
  ProjectDetailDocument,
  ProjectType,
  RecommendedJobSeekerListingDocument,
  useCreateApplicationMutation,
  useSendNotificationMutation
} from '../../../../../graphql/api'
import { generateGenderIcon } from '../../../../../@core/utils/generate-gender-icon'
import { MapMarkerOutline, PhoneOutline } from 'mdi-material-ui'
import { onCompleted, onError } from '../../../../../@core/utils/response'

const JobSeekerPersonalInfoSection = ({
  jobSeeker,
  applications,
  project
}: {
  jobSeeker: JobSeekerType | undefined
  applications: Array<ProjectApplicationType>
  project: ProjectType
}) => {
  const [buttonTitle, setButtonTitle] = useState('Invite')
  const [isProjectApplied, setIsProjectApplied] = useState(false)

  const [createApplication, { loading }] = useCreateApplicationMutation({
    variables: {
      userId: parseInt(jobSeeker?.seekerId),
      projectId: parseInt(project?.projectId),
      applicationIsInvited: true
    },
    onCompleted: data => {
      sendNotif({
        variables: {
          input: {
            senderId: parseInt(project?.companyId),
            receiverId: parseInt(jobSeeker?.seekerId),
            message: `${project?.company?.companyName} has invited you to join ${project?.projectName}`
          }
        }
      })
      onCompleted(data?.createApplication, undefined)
    },
    onError: error => onError(error),
    refetchQueries: [ProjectDetailDocument, RecommendedJobSeekerListingDocument]
  })

  const [sendNotif] = useSendNotificationMutation()

  const handleApply = () => {
    createApplication()
  }

  useEffect(() => {
    applications.some(application => {
      if (parseInt(application.seekerId) === parseInt(jobSeeker?.seekerId)) {
        if (application.applicationIsInvited) {
          setButtonTitle('Invited')
        } else {
          setButtonTitle('Applied')
        }
        setIsProjectApplied(true)

        return true
      }
      setButtonTitle('Invite')
      setIsProjectApplied(false)

      return false
    })
  }, [jobSeeker])

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant={'h5'} fontWeight={700} mr={2}>
            {jobSeeker?.seekerName ?? '-'}
          </Typography>
          <Typography variant={'body1'}> {generateGenderIcon(jobSeeker?.seekerGender)}</Typography>
        </Box>
        <Button variant={'contained'} onClick={handleApply} disabled={loading || isProjectApplied}>
          {buttonTitle}
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={2}>
        <Typography variant={'body1'}>{jobSeeker?.seekerAge + ' Years old'}</Typography>
        <Box display={'flex'} alignItems={'center'}>
          <PhoneOutline fontSize={'small'} sx={{ mr: 1 }} />
          <Typography variant={'body1'}>+60{jobSeeker?.seekerPhoneNo}</Typography>
        </Box>
      </Box>
      <Box pb={5} display={'flex'} alignItems={'center'}>
        <MapMarkerOutline fontSize={'small'} sx={{ mr: 1 }} />
        <Typography variant={'body1'}>
          {jobSeeker?.seekerStreet}, {jobSeeker?.seekerCity}, {jobSeeker?.seekerState}
        </Typography>
      </Box>
    </>
  )
}

export default JobSeekerPersonalInfoSection
