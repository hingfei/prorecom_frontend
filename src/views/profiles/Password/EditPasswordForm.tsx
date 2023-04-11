import { Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useUpdateJobSeekerPasswordMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import PasswordForm from './PasswordForm'
import { useEffect } from 'react'

const EditPasswordForm = () => {
  const { isOpen, content } = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch()

  const formMethods = useForm()

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = formMethods

  useEffect(() => {
    reset({
      currentPassword: '',
      newPassword: ''
    })
  }, [isOpen])

  const [updateJobSeekerPasswordMutation, { loading: updateLoading }] = useUpdateJobSeekerPasswordMutation({
    onCompleted: data =>
      onCompleted(data?.updateJobSeekerPassword, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [JobSeekerDetailDocument]
  })

  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)
    console.log('input', input)

    updateJobSeekerPasswordMutation({
      variables: {
        userId: parseInt(content),
        currentPassword: input.currentPassword,
        newPassword: input.newPassword
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Update Password
        </Typography>

        <PasswordForm isEdit onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
      </form>
    </FormProvider>
  )
}

export default EditPasswordForm
