import { Box, Grid, Icon, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  JobSeekerType,
  ProjectApplicationType,
  ProjectType,
  useRecommendedJobSeekerListingLazyQuery,
  useSearchJobSeekersLazyQuery
} from '../../../../graphql/api'
import Spinner from '../../../../@core/components/spinner'
import { AlertCircleOutline } from 'mdi-material-ui'
import JobSeekerListing from './JobSeekerListing'
import JobSeekerDetails from './JobSeekerDetails/JobSeekerDetails'
import { FormProvider, useForm } from 'react-hook-form'
import { onError } from '../../../../@core/utils/response'
import { useRouter } from 'next/router'
import { useAuth } from '../../../../@core/context/authContext'
import { getFormInputValues } from '../../../../@core/utils/get-form-input-values'
import SearchJobSeeker from './SearchJobSeeker'

/**
 * RecommendedJobSeekerSection Component
 *
 * This component displays the recommended job seekers for a specific project.
 * It also provides a search functionality to search for job seekers and view their details.
 *
 * @param {Object} props - The component props.
 * @param {number} props.projectId - The ID of the project to fetch recommended job seekers for.
 * @param {Array<ProjectApplicationType>} props.applications - The list of project applications.
 * @param {ProjectType} props.project - The project details.
 * @returns {JSX.Element} The RecommendedJobSeekerSection component.
 */
function RecommendedJobSeekerSection({
  projectId,
  applications,
  project
}: {
  projectId: number
  applications: Array<ProjectApplicationType> | undefined
  project: ProjectType
}) {
  const router = useRouter()
  const { resetStore } = useAuth()
  const [switchOption, setSwitchOption] = useState({ checked: true, label: 'Best Match', disabled: true })
  const [loading, setLoading] = useState(true)
  const [jobSeeker, setJobSeeker] = useState<JobSeekerType>()
  const [jobSeekerList, setJobSeekerList] = useState([])
  const formMethods = useForm()

  const { handleSubmit, reset } = formMethods

  const [fetchJobSeeker, { loading: seekerLoading }] = useRecommendedJobSeekerListingLazyQuery({
    variables: {
      projectId: projectId
    },
    onCompleted: data => {
      setJobSeeker(data?.recommendedJobSeekerListing[0])
      setJobSeekerList(data?.recommendedJobSeekerListing)
      if (!switchOption.checked) {
        setSwitchOption({ checked: true, label: 'Best Match', disabled: true })
      }
      reset({ searchKeyword: '' })
      setLoading(false)
    },
    onError: error => {
      onError(error, undefined)
      if (error.message === 'Invalid token') {
        resetStore()
        router.push('/401')
      }
      setLoading(false)
    },
    fetchPolicy: 'no-cache'
  })

  const [searchJobSeeker, { loading: searchLoading }] = useSearchJobSeekersLazyQuery({
    onCompleted: data => {
      setJobSeeker(data?.searchJobSeekers[0])
      setJobSeekerList(data?.searchJobSeekers)
      if (switchOption.checked) {
        setSwitchOption({ checked: false, label: 'Default', disabled: false })
      }
      setLoading(false)
    },
    onError: error => {
      onError(error, undefined)
    },
    fetchPolicy: 'no-cache'
  })

  const handleChangeJobSeekerList = () => {
    if (!switchOption.checked) {
      setSwitchOption({ checked: true, label: 'Best Match', disabled: true })
      fetchJobSeeker()
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchJobSeeker()
  }, [])

  const onChangeJobSeeker = (jobSeeker: JobSeekerType) => {
    setJobSeeker(jobSeeker)
  }

  const onSubmit = (values: any) => {
    if (values.searchKeyword === '') {
      fetchJobSeeker()
    } else {
      const input = getFormInputValues(values)

      searchJobSeeker({
        variables: {
          searchKeyword: input.searchKeyword
        }
      })
    }
  }

  if (loading || seekerLoading || searchLoading) {
    return <Spinner />
  }

  return (
    <FormProvider {...formMethods}>
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        {jobSeekerList?.length > 0 ? (
          <Box>
            <Grid container spacing={{ xs: 0, lg: 6 }}>
              <Grid item xs={12} md={4.5}>
                <SearchJobSeeker
                  onClick={handleSubmit(onSubmit)}
                  switchOption={switchOption}
                  handleChangeJobSeekerList={handleChangeJobSeekerList}
                />
                <JobSeekerListing
                  jobSeekerList={jobSeekerList}
                  jobSeeker={jobSeeker}
                  onChangeJobSeeker={onChangeJobSeeker}
                />
              </Grid>
              <Grid item xs={7.5} md={7.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <JobSeekerDetails jobSeeker={jobSeeker} applications={applications} project={project} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box height={'100%'}>
            <Grid container>
              <Grid item xs={12} md={4.5}>
                <SearchJobSeeker
                  onClick={handleSubmit(onSubmit)}
                  switchOption={switchOption}
                  handleChangeJobSeekerList={handleChangeJobSeekerList}
                />
              </Grid>
            </Grid>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
              height={'75%'}
            >
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
        )}
      </form>
    </FormProvider>
  )
}

export default RecommendedJobSeekerSection
