import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useUpdateJobSeekerMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import EducationForm from './EducationForm'

// Default values for the education form fields
const educationDefaultValues = {
  educationLevel: null,
  educationInstitution: null,
  fieldOfStudy: null,
  graduationYear: null,
  description: null,
  grade: null
}

/**
 * AddEducationForm Component
 *
 * This component allows users to add education information. It provides a form to fill in the details of the education,
 * such as education level, institution, field of study, graduation year, description, and grade. Users can submit the
 * form to add their education information using the `useUpdateJobSeekerMutation` hook.
 *
 * @returns {JSX.Element} The form to add education information.
 */
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

  // Reset the form fields with default values when the drawer is opened
  const resetValue = () => {
    reset(educationDefaultValues)
  }

  // Reset the form fields when the drawer is opened
  useEffect(() => {
    resetValue()
  }, [isOpen])

  // Update the user's education information using the useUpdateJobSeekerMutation hook
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
