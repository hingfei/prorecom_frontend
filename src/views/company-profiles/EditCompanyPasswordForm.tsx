import { Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { CompanyDetailDocument, useUpdateCompanyPasswordMutation } from "../../graphql/api";
import { closeDrawerState, useAppDispatch, useAppSelector } from "../../store";
import { onCompleted, onError } from "../../@core/utils/response";
import { getFormInputValues } from "../../@core/utils/get-form-input-values";
import PasswordForm from "../profiles/Password/PasswordForm";

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

  const [updateCompanyPassword, { loading: updateLoading }] = useUpdateCompanyPasswordMutation({
    onCompleted: data =>
      onCompleted(data?.updateCompanyPassword, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [CompanyDetailDocument]
  })

  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)

    updateCompanyPassword({
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
