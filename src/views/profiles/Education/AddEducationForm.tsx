import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useUpdateJobSeekerMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import EducationForm from './EducationForm'

const educationDefaultValues = {
  educationLevel: null,
  educationInstitution: null,
  fieldOfStudy: null,
  graduationYear: null,
  description: null,
  grade: null
}

const AddEducationForm = () => {
  const { isOpen, content } = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch()

  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = formMethods

  const resetValue = () => {
    reset(educationDefaultValues)
  }

  useEffect(() => {
    resetValue()
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
          seekerId: parseInt(content),
          educations: [input]
        }
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Add Education Info
        </Typography>

        <EducationForm onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
      </form>
    </FormProvider>
  )
}

export default AddEducationForm
