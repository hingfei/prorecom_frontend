import { Box, Button, Grid, Link, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'
import { EyeOutline } from 'mdi-material-ui'
import React from 'react'

/**
 * ResumeSection Component
 *
 * This component displays the resume section for a job seeker, including the resume PDF view and an "Edit" button.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.jobSeeker - The job seeker object containing the resume information.
 * @param {string | undefined} props.seekerId - The job seeker ID.
 * @param {boolean} props.viewOnly - Flag to indicate if the view is for display-only (view mode).
 * @returns {JSX.Element} The ResumeSection component.
 */
const ResumeSection = ({
  jobSeeker,
  seekerId,
  viewOnly
}: {
  jobSeeker: any
  seekerId: string | undefined
  viewOnly: boolean
}) => {
  const dispatch = useAppDispatch()

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Resume
        </Typography>
        {!viewOnly && (
          <Button
            variant={'contained'}
            onClick={() =>
              dispatch(setDrawerState({ isOpen: true, type: DrawerType.editResumeForm, content: seekerId }))
            }
          >
            Edit
          </Button>
        )}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1} width={'100%'}>
        {jobSeeker?.seekerResume ? (
          <Grid container alignItems={'center'} justifyContent={'center'} width={'100%'}>
            <Grid item xs={11}>
              <embed
                key={jobSeeker?.seekerResume}
                src={`/images/jobseekers/resumes/${jobSeeker?.seekerResume}?timestamp=${Date.now()}`}
                type='application/pdf'
                width='100%'
                height='350px'
              />
            </Grid>
            <Grid item mt={4}>
              <Link target={'_blank'} href={`/images/jobseekers/resumes/${jobSeeker?.seekerResume}`}>
                <Button variant={'outlined'} startIcon={<EyeOutline />}>
                  View
                </Button>
              </Link>
            </Grid>
          </Grid>
        ) : (
          // Render this message if no resume is provided
          <Typography variant={'body2'}>No information is provided</Typography>
        )}
      </Box>
    </Box>
  )
}

export default ResumeSection
