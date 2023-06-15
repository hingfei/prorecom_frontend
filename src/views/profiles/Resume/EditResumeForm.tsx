import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { closeDrawerState, useAppDispatch, useAppSelector } from '../../../store'
import ResumeForm from './ResumeForm'
import toast from 'react-hot-toast'
import { JobSeekerDetailDocument, useUploadResumeMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'

const EditResumeform = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const { isOpen, content } = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch()

  const [uploadResumeMutation, { loading }] = useUploadResumeMutation({
    onCompleted: data =>
      onCompleted(data?.uploadResume, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [JobSeekerDetailDocument]
  })

  const onSubmit = async event => {
    event.preventDefault()

    if (selectedFile.length == 0) {
      toast.error('Upload a file to proceed')

      return
    } else {
      const fileType = selectedFile[0].name.split('.')[1]
      if (fileType !== 'pdf') {
        toast.error('Only pdf file is accepted')

        return
      }
    }

    uploadResumeMutation({
      variables: {
        seekerId: parseInt(content),
        seekerResume: selectedFile[0]
      }
    })
  }

  useEffect(() => {
    setSelectedFile([])
  }, [isOpen]);


  return (
    <form onSubmit={onSubmit}>
      <Typography variant='h6' sx={{ fontWeight: 600 }}>
        Edit Resume
      </Typography>

      <ResumeForm
        isEdit
        onClick={onSubmit}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        disabled={loading}
      />
    </form>
  )
}

export default EditResumeform
