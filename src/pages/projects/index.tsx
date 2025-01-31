import { Box, Grid, Icon, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  ProjectType,
  useGetJobSeekerApplicationsQuery,
  useJobSeekerDetailLazyQuery,
  useProjectListingLazyQuery,
  useSearchProjectsLazyQuery
} from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import withAuth from '../../@core/hooks/withAuth'
import ProjectDetails from '../../views/projects/ProjectDetails/ProjectDetails'
import ProjectListing from '../../views/projects/ProjectListing'
import { AlertCircleOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { getFormInputValues } from '../../@core/utils/get-form-input-values'
import SearchFilter from '../../views/projects/SearchFilter'
import { onError } from '../../@core/utils/response'
import { useAuth } from '../../@core/context/authContext'
import { PROJECTS_PER_PAGE } from '../../constants'

/**
 * Component: Projects
 *
 * This component displays the list of projects and allows job seekers to filter and search for projects.
 * It also supports pagination to display a limited number of projects per page.
 */
function Projects() {
  const router = useRouter()
  const { resetStore } = useAuth()
  const [switchOption, setSwitchOption] = useState({ checked: true, label: 'Best Match' })
  const [loading, setLoading] = useState(true)
  const [filteredProjectList, setFilteredProjectList] = useState([])
  const [defaultProjectList, setDefaultProjectList] = useState([])
  const [project, setProject] = useState<ProjectType>()
  const [projectList, setProjectList] = useState([])
  const [applications, setApplications] = useState([])
  const [jobSeeker, setJobSeeker] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterState, setFilterState] = useState(false)

  const formMethods = useForm()

  const { handleSubmit, setValue, reset } = formMethods

  // Fetch recommended projects using the useProjectListingLazyQuery hook from GraphQL
  const [fetchProject, { loading: fetchLoading }] = useProjectListingLazyQuery({
    variables: {
      recommendation: true
    },
    onCompleted: data => {
      setProject(data?.projectListing[0])
      setProjectList(data?.projectListing.slice(0, 10))
      setDefaultProjectList(data?.projectListing)
      reset({ searchKeyword: null })
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

  // Search for projects using the useSearchProjectsLazyQuery hook from GraphQL
  const [searchProject, { loading: searchLoading }] = useSearchProjectsLazyQuery({
    onCompleted: data => {
      setProject(data.searchProjects[0])
      setProjectList(data?.searchProjects.slice(0, 10))
      setDefaultProjectList(data?.searchProjects)
      if (switchOption.checked) {
        setSwitchOption({ checked: false, label: 'Default' })
      }
      setLoading(false)
    },
    onError: error => {
      // console.log(error)
    },
    fetchPolicy: 'no-cache'
  })

  // Fetch the job seeker's applications using the useGetJobSeekerApplicationsQuery hook from GraphQL
  const { loading: applicationLoading } = useGetJobSeekerApplicationsQuery({
    onCompleted: async data => {
      setApplications(data?.getJobSeekerApplications)
    },
    onError: error => {
      onError(error, undefined)
    },
    fetchPolicy: 'no-cache'
  })

  // Fetch the job seeker's details using the useJobSeekerDetailLazyQuery hook from GraphQL
  const [fetchJobSeeker, { loading: seekerLoading }] = useJobSeekerDetailLazyQuery({
    onCompleted: async data => {
      setJobSeeker(data?.jobSeekerDetail)
    },
    onError: error => {
      onError(error, undefined)
    },
    fetchPolicy: 'cache-and-network'
  })

  // Handle switch option change to switch between 'Best Match' and 'Default' project lists
  const handleChangeProjectList = () => {
    setCurrentPage(1)
    if (switchOption.checked) {
      setSwitchOption({ checked: false, label: 'Default' })
      fetchProject({
        variables: {
          recommendation: false
        }
      })
    } else {
      setSwitchOption({ checked: true, label: 'Best Match' })
      fetchProject({
        variables: {
          recommendation: true
        }
      })
    }
  }

  // Initial data fetching on component mount or when the router query changes
  useEffect(() => {
    setFilterState(false)
    setFilteredProjectList([])
    setCurrentPage(1)
    setLoading(true)
    const data = window.localStorage.getItem('userData')
    if (data) {
      const userData = JSON.parse(data)
      fetchJobSeeker({
        variables: {
          seekerId: parseInt(userData?.userId)
        }
      })
    }

    if (router.query.keywords) {
      setValue('searchKeyword', router.query.keywords.toString())
      searchProject({
        variables: {
          searchKeyword: router.query.keywords.toString()
        }
      })
    } else {
      fetchProject({
        variables: {
          recommendation: true
        }
      })
    }
  }, [])

  // Pagination logic to update the displayed projects when the page changes
  useEffect(() => {
    const lastIndex = currentPage * PROJECTS_PER_PAGE
    const firstIndex = lastIndex - PROJECTS_PER_PAGE

    if (filterState) {
      setProjectList(filteredProjectList.slice(firstIndex, lastIndex))
    } else {
      setProjectList(defaultProjectList.slice(firstIndex, lastIndex))
    }
  }, [currentPage])

  // Handle page change when the pagination component is used
  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle project selection from the list of projects
  const onChangeProject = (project: ProjectType) => {
    setProject(project)
  }

  // Handle form submission for project search
  const onSubmit = (values: any) => {
    setCurrentPage(1)

    if (values.searchKeyword === '') {
      if (switchOption.checked) {
        fetchProject({
          variables: {
            recommendation: true
          }
        })
      } else {
        fetchProject({
          variables: {
            recommendation: false
          }
        })
      }
    } else {
      const input = getFormInputValues(values)

      searchProject({
        variables: {
          searchKeyword: input.searchKeyword
        }
      })
    }
  }

  if (loading || fetchLoading || searchLoading || applicationLoading || seekerLoading) {
    return <Spinner />
  }

  // Render the projects listing and details components with pagination
  return (
    <FormProvider {...formMethods}>
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        {projectList.length > 0 ? (
          <Box>
            <Grid container spacing={{ xs: 0, lg: 6 }}>
              <Grid item xs={12} md={4.5}>
                <SearchFilter
                  onClick={handleSubmit(onSubmit)}
                  handleChangeProjectList={handleChangeProjectList}
                  switchOption={switchOption}
                  defaultProjectList={defaultProjectList}
                  setProjectList={setProjectList}
                  setCurrentPage={setCurrentPage}
                  setFilteredProjectList={setFilteredProjectList}
                  setFilterState={setFilterState}
                />
                <ProjectListing projectListing={projectList} project={project} onChangeProject={onChangeProject} />
                <Stack direction='row' justifyContent='center' sx={{ mt: '3vh' }}>
                  <Pagination
                    count={
                      filterState
                        ? Math.ceil(filteredProjectList.length / PROJECTS_PER_PAGE)
                        : Math.ceil(defaultProjectList.length / PROJECTS_PER_PAGE)
                    }
                    page={currentPage}
                    onChange={handlePageChange}
                    variant={'outlined'}
                    color={'primary'}
                  />
                </Stack>
              </Grid>
              <Grid item xs={7.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <ProjectDetails project={project} applications={applications} jobSeeker={jobSeeker} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box height={'100%'}>
            <Grid container>
              <Grid item xs={12} md={4.5}>
                <SearchFilter
                  onClick={handleSubmit(onSubmit)}
                  handleChangeProjectList={handleChangeProjectList}
                  switchOption={switchOption}
                  defaultProjectList={defaultProjectList}
                  setProjectList={setProjectList}
                  setCurrentPage={setCurrentPage}
                  setFilteredProjectList={setFilteredProjectList}
                  setFilterState={setFilterState}
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
                Opps! No Project is Found.
              </Typography>
            </Box>
          </Box>
        )}
      </form>
    </FormProvider>
  )
}

export default withAuth(Projects, ['job_seekers'])
