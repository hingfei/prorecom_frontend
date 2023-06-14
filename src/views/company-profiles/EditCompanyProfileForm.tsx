import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CompanyProfileForm from "./CompanyProfileForm";
import { closeDrawerState, useAppDispatch, useAppSelector } from "../../store";
import { CompanyDetailDocument, useCompanyDetailQuery, useUpdateCompanyMutation } from "../../graphql/api";
import { onCompleted, onError } from "../../@core/utils/response";
import { getFormInputValues } from "../../@core/utils/get-form-input-values";
import Spinner from "../../@core/components/spinner";

const EditCompanyProfileForm = () => {
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

  const resetValue = (companyDetail: any) => {
    const formValues = {
      companyName: companyDetail?.companyName,
      companyFounder: companyDetail?.companyFounder,
      companySize: companyDetail?.companySize,
      userEmail: companyDetail?.users.userEmail,
      companyDesc: companyDetail?.companyDesc,
      companyStreet: companyDetail?.companyStreet,
      companyCity: companyDetail?.companyCity,
      companyState: companyDetail?.companyState
    }

    reset(formValues)
    setLoading(false)
  }

  const { loading: queryLoading, data } = useCompanyDetailQuery({
    variables: {
      companyId: parseInt(content)
    },
    onCompleted: ({ companyDetail }) => {
      resetValue(companyDetail)
    }
  })

  useEffect(() => {
    if (data?.companyDetail) {
      resetValue(data?.companyDetail)
    }
  }, [isOpen])

  const [updateCompany, { loading: updateLoading }] = useUpdateCompanyMutation({
    onCompleted: data =>
      onCompleted(data?.updateCompany, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined, setError)
    },
    refetchQueries: [CompanyDetailDocument]
  })

  const onSubmit = (values: any) => {
    const input = getFormInputValues(values)

    updateCompany({
      variables: {
        input: {
          ...input,
          companyId: data?.companyDetail?.companyId
        }
      }
    })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Edit Profile
        </Typography>

        {queryLoading || loading ? (
          <Spinner />
        ) : (
          <CompanyProfileForm isEdit onClick={handleSubmit(onSubmit)} disabled={isSubmitting || updateLoading} />
        )}
      </form>
    </FormProvider>
  )
}

export default EditCompanyProfileForm
