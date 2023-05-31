import { Grid } from '@mui/material'
import PageHeader from '../../../@core/components/page-header'
import { useRouter } from 'next/router'
import withAuth from '../../../@core/hooks/withAuth'

const projectDefaultValues = {
  educationLevel: null,
  educationInstitution: null,
  fieldOfStudy: null,
  graduationYear: null,
  description: null,
  grade: null
}

const AddProject = () => {
  const router = useRouter()

  return (
    <Grid container spacing={6}>
      <PageHeader title={'Add Project'} />
    </Grid>
  )
}

export default withAuth(AddProject, ['companies'])
