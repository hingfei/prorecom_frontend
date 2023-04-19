import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JobSeekerDetailDocument, useJobSeekerDetailQuery, useUpdateJobSeekerMutation } from '../../../graphql/api'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import Spinner from '../../../@core/components/spinner'
import { onCompleted, onError } from '../../../@core/utils/response'
import { getFormInputValues } from '../../../@core/utils/get-form-input-values'
import SkillForm from './SkillForm'

const EditSkillForm = () => {
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
    console.log(jobSeekerDetail)
    const skillList = jobSeekerDetail?.skills.map((item) => ({
      value: item.skillId
    }))
    const formValues = {
      skills: skillList
    }

    console.log({ formValues })
    reset(formValues)
    setLoading(false)
  }

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
    console.log('input', input)

    // updateJobSeeker({
    //   variables: {
    //     input: {
    //       ...input,
    //       seekerId: data?.jobSeekerDetail?.seekerId
    //     }
    //   }
    // })
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Edit Skills
        </Typography>

        {queryLoading || loading ? (
          <Spinner />
        ) : (
          <SkillForm
            isEdit
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || updateLoading}
          />
        )}
      </form>
    </FormProvider>
  )
}

export default EditSkillForm
