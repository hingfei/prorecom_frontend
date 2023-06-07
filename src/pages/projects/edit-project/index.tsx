import { Grid } from '@mui/material'
import PageHeader from '../../../@core/components/page-header'
import { useRouter } from 'next/router'
import withAuth from '../../../@core/hooks/withAuth'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { ProjectDetailDocument, useProjectDetailQuery, useUpdateProjectMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import ProjectForm from 'src/views/projects/CompanyProject/ProjectForm'
import Spinner from '../../../@core/components/spinner'

const EditProject = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = formMethods

  const resetValue = (projectDetail: any) => {
    console.log(projectDetail)
    const skillList = projectDetail?.skills.map(item => item.skillId)

    const formValues = {
      projectId: projectDetail.projectId,
      projectDesc: projectDetail.projectDesc,
      projectExpLvl: projectDetail.projectExpLvl,
      projectMaxSalary: projectDetail.projectMaxSalary,
      projectMinSalary: projectDetail.projectMinSalary,
      projectName: projectDetail.projectName,
      projectReq: projectDetail.projectReq,
      projectStatus: projectDetail.projectStatus,
      projectTypes: projectDetail.projectTypes,
      skills: skillList
    }
    reset(formValues)
    setLoading(false)
  }

  const { data, loading: queryLoading } = useProjectDetailQuery({
    variables: { projectId: parseInt(router.query.id) },
    onCompleted: ({ projectDetail }) => {
      resetValue(projectDetail)
    }
  })

  const [updateProject, { loading: updateLoading }] = useUpdateProjectMutation({
    onCompleted: data =>
      onCompleted(data?.updateProject, () => {
        router.push(`/company-dashboard/${data?.updateProject?.project?.projectId}`)
        console.log('project updated', data)
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [ProjectDetailDocument]
  })

  const onSubmit = (values: any) => {
    const { skills, ...restValues } = values
    const skillsArray = skills ? skills.map((skill: any) => parseInt(skill.value)) : []
    const input = getFormInputValues(restValues)
    console.log(input)
    updateProject({
      variables: {
        input: {
          skills: skillsArray,
          ...input
        }
      }
    })
  }

  if (loading || queryLoading) {
    return <Spinner />
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <PageHeader title={'Edit Project'} />

          <ProjectForm isEdit onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
        </Grid>
      </form>
    </FormProvider>
  )
}

export default withAuth(EditProject, ['companies'])
