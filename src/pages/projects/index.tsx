import { Box, FormControlLabel, Grid, Icon, Switch, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ProjectType, useProjectListingLazyQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import withAuth from '../../@core/hooks/withAuth'
import ProjectDetails from '../../views/projects/ProjectDetails/ProjectDetails'
import ProjectListing from '../../views/projects/ProjectListing'
import { AlertCircleOutline } from 'mdi-material-ui'

function Projects() {
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(true);
  const [label, setLabel] = useState('Recommended');
  const [project, setProject] = useState<ProjectType>()

  const [fetchProject, { data, loading: fetchLoading }] = useProjectListingLazyQuery({
    variables: {
      recommendation: true
    },
    onCompleted: data => {
      setProject(data.projectListing[0])
      setLoading(false)
    },
    fetchPolicy: 'no-cache'
  })

  const handleChangeProjectList = () => {
    if (checked) {
      setChecked(false)
      setLabel('Default')
      fetchProject({
        variables: {
          recommendation: false
        }
      })
    } else {
      setChecked(true)
      setLabel('Recommended')
      fetchProject({
        variables: {
          recommendation: true
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProject({
      variables: {
        recommendation: true
      }
    })
  }, [])

  if (loading || fetchLoading) {
    return <Spinner />
  }

  const onChangeProject = (project: ProjectType) => {
    setProject(project)
  }

  return data != null ? (
    <Box>
      <Grid container>
        <FormControlLabel control={<Switch checked={checked} onChange={handleChangeProjectList} />} label={label} />
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={4.5}>
          <ProjectListing projectListing={data?.projectListing} project={project} onChangeProject={onChangeProject} />
        </Grid>
        <Grid item xs={7.5}>
          <ProjectDetails project={project} />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={'100%'}>
      <Box>
        <Icon sx={{ fontSize: '100px', display: 'initial' }}>
          <AlertCircleOutline sx={{ fontSize: '100px' }} />
        </Icon>
      </Box>
      <Typography variant={'h5'} fontWeight={600}>
        Opps! No Project is Found.
      </Typography>
    </Box>
  )
}

export default withAuth(Projects)
