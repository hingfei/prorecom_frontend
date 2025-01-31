import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CompanyProfileForm from "./CompanyProfileForm";
import { closeDrawerState, useAppDispatch, useAppSelector } from "../../store";
import { CompanyDetailDocument, useCompanyDetailQuery, useUpdateCompanyMutation } from "../../graphql/api";
import { onCompleted, onError } from "../../@core/utils/response";
import { getFormInputValues } from "../../@core/utils/get-form-input-values";
import Spinner from "../../@core/components/spinner";

/**
 * EditCompanyProfileForm Component
 *
 * This component displays the form for editing the company profile.
 * It allows the user to update various fields related to the company's details.
 */
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

  /**
   * Resets the form values with the company details fetched from the server.
   *
   * @param {Object} companyDetail - The company details fetched from the server.
   */
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

  /**
   * Handles the form submission event.
   * It updates the company profile with the new values.
   *
   * @param {Object} values - Form values.
   */
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
