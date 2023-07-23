import { Grid } from '@mui/material'
import PageHeader from '../../../@core/components/page-header'
import { useRouter } from 'next/router'
import withAuth from '../../../@core/hooks/withAuth'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { CompanyProjectListingDocument, useCreateProjectMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import ProjectForm from 'src/views/projects/CompanyProject/ProjectForm'

const projectDefaultValues = {
  projectName: null,
  projectTypes: null,
  projectMinSalary: null,
  projectMaxSalary: null,
  projectDesc: null,
  projectReq: null,
  projectStatus: null,
  projectExpLvl: null,
  skills: []
}

/**
 * AddProject Component represents the page for adding a new project by a company.
 * It uses the ProjectForm component to display the project form and handles form submission to create the project.
 *
 * @returns {JSX.Element} The JSX element representing the AddProject component.
 */
const AddProject = () => {
  const router = useRouter()
  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = formMethods

  // ** Reset form values to default when component mounts
  const resetValue = () => {
    reset(projectDefaultValues)
  }

  useEffect(() => {
    resetValue()
  }, [])

  // ** GraphQL mutation to create a new project
  const [createProject, { loading }] = useCreateProjectMutation({
    onCompleted: data =>
      onCompleted(data?.createProject, () => {
        router.push(`/projects/${data?.createProject?.project?.projectId}`)
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [CompanyProjectListingDocument]
  })

  // ** Handle form submission
  const onSubmit = (values: any) => {
    const { skills, ...restValues } = values
    const skillsArray = skills ? skills.map((skill: any) => parseInt(skill.value)) : []
    const input = getFormInputValues(restValues)

    createProject({
      variables: {
        input: {
          companyId: router.query.id,
          skills: skillsArray,
          ...input
        }
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <PageHeader title={'Add Project'} />
          <ProjectForm onClick={handleSubmit(onSubmit)} disabled={isSubmitting || loading} />
        </Grid>
      </form>
    </FormProvider>
  )
}

export default withAuth(AddProject, ['companies'])
