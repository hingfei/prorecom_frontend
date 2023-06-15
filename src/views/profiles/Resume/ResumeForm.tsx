import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { closeDrawerState, useAppDispatch } from '../../../store'
import FileUpload from 'react-material-file-upload'

const ResumeForm = ({
  isEdit,
  selectedFile,
  setSelectedFile,
  ...props
}: ButtonProps & { isEdit?: boolean; selectedFile: File[]; setSelectedFile: any }) => {
  const dispatch = useAppDispatch()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <FileUpload value={selectedFile} onChange={setSelectedFile} />
      </Grid>

      <Box display='flex' justifyContent='center' py={10}>
        <Button
          variant='contained'
          sx={{
            mr: 2
          }}
          {...props}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
        <Button onClick={onCancel} color='secondary' variant='outlined'>
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default ResumeForm
