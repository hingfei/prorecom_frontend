import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useJobSeekerDetailQuery, useUpdateJobSeekerMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import Spinner from '../../../@core/components/spinner'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import AboutForm from "./AboutForm";

/**
 * EditAboutForm Component
 *
 * This component allows users to edit their "About" information. It fetches the user's existing "About" information
 * using the `useJobSeekerDetailQuery` hook and displays it in a form. Users can update their "About" information
 * using the form and submit the changes through the `useUpdateJobSeekerMutation` hook.
 *
 * @returns {JSX.Element} The edit form for the "About" section, including the existing information and a form to update it.
 */
const EditAboutForm = () => {
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

  // Reset the form values with the existing "About" information from the server response
  const resetValue = (jobSeekerDetail: any) => {
    const formValues = {
      seekerAbout: jobSeekerDetail?.seekerAbout,
    }

    reset(formValues)
    setLoading(false)
  }

  // Fetch the user's existing "About" information using the useJobSeekerDetailQuery hook
  const { loading: queryLoading, data } = useJobSeekerDetailQuery({
    variables: {
      seekerId: parseInt(content)
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

  // Update the user's "About" information using the useUpdateJobSeekerMutation hook
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
          ...input,
          seekerId: data?.jobSeekerDetail?.seekerId
        }
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Edit About
        </Typography>

        {queryLoading || loading ? (
          <Spinner />
        ) : (
          <AboutForm isEdit onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
        )}
      </form>
    </FormProvider>
  )
}

export default EditAboutForm
