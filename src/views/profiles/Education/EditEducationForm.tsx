import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useJobSeekerDetailQuery, useUpdateJobSeekerMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import Spinner from '../../../@core/components/spinner'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import EducationForm from './EducationForm'

const EditEducationForm = () => {
  const [loading, setLoading] = useState(true)
  const { isOpen, content } = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch()

  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = formMethods

  const resetValue = (jobSeekerDetail: any) => {
    const edu = jobSeekerDetail.educations.find(item => item.educationId == content.eduId)

    const formValues = {
      educationId: edu?.educationId,
      educationLevel: edu?.educationLevel,
      educationInstitution: edu?.educationInstitution,
      fieldOfStudy: edu?.fieldOfStudy,
      graduationYear: edu?.graduationYear,
      description: edu?.description,
      grade: edu?.grade
    }

    reset(formValues)
    setLoading(false)
  }

  const { loading: queryLoading, data } = useJobSeekerDetailQuery({
    variables: {
      seekerId: parseInt(content.seekerId)
    },
    onCompleted: ({ jobSeekerDetail }) => {
      resetValue(jobSeekerDetail)
    }
  })

  useEffect(() => {
    if (data?.jobSeekerDetail) {
      resetValue(data?.jobSeekerDetail)
    }
  }, [isOpen])

  const [updateJobSeeker, { loading: updateLoading }] = useUpdateJobSeekerMutation({
    onCompleted: data =>
      onCompleted(data?.updateJobSeeker, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [JobSeekerDetailDocument]
  })

  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)

    updateJobSeeker({
      variables: {
        input: {
          seekerId: data?.jobSeekerDetail?.seekerId,
          educations: [input]
        }
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Edit Education Info
        </Typography>

        {queryLoading || loading ? (
          <Spinner />
        ) : (
          <EducationForm isEdit onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
        )}
      </form>
    </FormProvider>
  )
}

export default EditEducationForm
