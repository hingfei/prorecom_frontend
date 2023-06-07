import { Box, Grid, Icon, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { JobSeekerType, RecommendedJobSeekerListingQuery } from '../../../../graphql/api'
import Spinner from '../../../../@core/components/spinner'
import { AlertCircleOutline } from 'mdi-material-ui'
import JobSeekerListing from "./JobSeekerListing";

function RecommendedJobSeekerSection({ seekerListing }: { seekerListing: RecommendedJobSeekerListingQuery }) {
  const [loading, setLoading] = useState(true)
  const [defaultProjectList, setDefaultProjectList] = useState([])
  const [jobSeeker, setJobSeeker] = useState<JobSeekerType>()
  const [jobSeekerList, setJobSeekerList] = useState([])

  // const [fetchProject, { loading: fetchLoading }] = useProjectListingLazyQuery({
  //   variables: {
  //     recommendation: true
  //   },
  //   onCompleted: data => {
  //     setJobSeeker(data?.projectListing[0])
  //     setJobSeekerList(data?.projectListing)
  //     setDefaultProjectList(data?.projectListing)
  //     setLoading(false)
  //   },
  //   onError: error => {
  //     onError(error, undefined)
  //     console.log('error', error)
  //     if ( error.message === 'Invalid token' ) {
  //       resetStore()
  //       router.push('/401')
  //     }
  //     setLoading(false)
  //   },
  //   fetchPolicy: 'no-cache'
  // })

  useEffect(() => {
    setLoading(true)
    if (seekerListing) {
      setJobSeeker(seekerListing?.recommendedJobSeekerListing[0])
      setJobSeekerList(seekerListing?.recommendedJobSeekerListing)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Spinner />
  }

  const onChangeProject = (jobSeeker: JobSeekerType) => {
    setJobSeeker(jobSeeker)
  }

  return seekerListing?.recommendedJobSeekerListing?.length > 0 ? (
    <Box>
      <Grid container spacing={{ xs: 0, lg: 6 }}>
        <Grid item xs={12} md={4.5}>
          <JobSeekerListing jobSeekerList={jobSeekerList} jobSeeker={jobSeeker} onChangeProject={onChangeProject} />
        </Grid>
        {/*<Grid item xs={7.5} sx={{ xs: { display: 'none' }, md: { display: 'flex' } }}>*/}
        {/*  <ProjectDetails project={jobSeeker}/>*/}
        {/*</Grid>*/}
      </Grid>
    </Box>
  ) : (
    <Box height={'100%'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={'75%'}>
        <Box>
          <Icon sx={{ fontSize: '100px', display: 'initial' }}>
            <AlertCircleOutline sx={{ fontSize: '100px' }} />
          </Icon>
        </Box>
        <Typography variant={'h5'} fontWeight={600}>
          Opps! No Potential Candidates is Found.
        </Typography>
      </Box>
    </Box>
  )
}

export default RecommendedJobSeekerSection
