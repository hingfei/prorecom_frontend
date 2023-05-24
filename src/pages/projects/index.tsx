import { Box, Grid, Icon, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ProjectType, useProjectListingLazyQuery, useSearchProjectsLazyQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import withAuth from '../../@core/hooks/withAuth'
import ProjectDetails from '../../views/projects/ProjectDetails/ProjectDetails'
import ProjectListing from '../../views/projects/ProjectListing'
import { AlertCircleOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { getFormInputValues } from '../../@core/utils/get-form-input-values'
import SearchFilter from '../../views/projects/SearchFilter'

function Projects() {
  const router = useRouter()
  const [switchOption, setSwitchOption] = useState({checked: true, label: 'Best Match'})
  const [label, setLabel] = useState('Best Match')
  const [loading, setLoading] = useState(true)
  const [defaultProjectList, setDefaultProjectList] = useState([]);
  const [project, setProject] = useState<ProjectType>()
  const [projectList, setProjectList] = useState([])

  const formMethods = useForm()

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue
  } = formMethods

  const [fetchProject, { loading: fetchLoading }] = useProjectListingLazyQuery({
    variables: {
      recommendation: true
    },
    onCompleted: data => {
      setProject(data?.projectListing[0])
      setProjectList(data?.projectListing)
      setDefaultProjectList(data?.projectListing)
      setLoading(false)
    },
    fetchPolicy: 'no-cache'
  })

  const [searchProject, { loading: searchLoading }] = useSearchProjectsLazyQuery({
    onCompleted: data => {
      setProject(data.searchProjects[0])
      setProjectList(data?.searchProjects)
      setDefaultProjectList(data?.searchProjects)
      setLoading(false)
    },
    fetchPolicy: 'no-cache'
  })

  const handleChangeProjectList = () => {
    if (switchOption.checked) {
      setSwitchOption({checked: false, label: 'Default'})
      fetchProject({
        variables: {
          recommendation: false
        }
      })
    } else {
      setSwitchOption({checked: true, label: 'Best Match'})
      fetchProject({
        variables: {
          recommendation: true
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    if (router.query.keywords) {
      console.log('keywords', router.query.keywords)
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

  if (loading || fetchLoading || searchLoading) {
    return <Spinner />
  }

  const onChangeProject = (project: ProjectType) => {
    setProject(project)
  }

  const onSubmit = (values: any) => {
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
      console.log('input', input)
      searchProject({
        variables: {
          searchKeyword: input.searchKeyword
        }
      })
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        {projectList.length > 0 ? (
          <Box>
            <Grid container spacing={6} sx={{ alignItems: 'center', paddingBottom: 6 }}>
              <SearchFilter
                onClick={handleSubmit(onSubmit)}
                handleChangeProjectList={handleChangeProjectList}
                switchOption={switchOption}
                projectList={projectList}
                defaultProjectList={defaultProjectList}
                setProjectList={setProjectList}
              />
            </Grid>

            <Grid container spacing={6}>
              <Grid item xs={4.5}>
                <ProjectListing projectListing={projectList} project={project} onChangeProject={onChangeProject} />
              </Grid>
              <Grid item xs={7.5}>
                <ProjectDetails project={project} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box height={'100%'}>
            <Grid container spacing={6} alignItems={'center'}>
              <SearchFilter
                onClick={handleSubmit(onSubmit)}
                handleChangeProjectList={handleChangeProjectList}
                switchOption={switchOption}
                projectList={projectList}
                defaultProjectList={defaultProjectList}
                setProjectList={setProjectList}
              />
            </Grid>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
              height={'100%'}
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

export default withAuth(Projects)
