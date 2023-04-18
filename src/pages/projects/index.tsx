import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { ProjectType, useProjectListingQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import withAuth from '../../@core/hooks/withAuth'
import ProjectDetails from '../../views/projects/ProjectDetails/ProjectDetails'
import ProjectListing from '../../views/projects/ProjectListing'

function Projects() {
  const [project, setProject] = useState<ProjectType>()
  const { data, loading } = useProjectListingQuery({
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (data) {
      setProject(data.projectListing[0])
    }
  }, [data])

  if (loading) {
    return <Spinner />
  }

  const onChangeProject = (project: ProjectType) => {
    setProject(project)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={4.5}>
        <ProjectListing projectListing={data?.projectListing} project={project} onChangeProject={onChangeProject} />
      </Grid>
      <Grid item xs={7.5}>
        <ProjectDetails project={project} />
      </Grid>
    </Grid>
  )
}

export default withAuth(Projects)
