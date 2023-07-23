import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { closeDrawerState, useAppDispatch } from '../../../store'
import FileUpload from 'react-material-file-upload'

/**
 * ResumeForm Component
 *
 * This component provides a form for uploading a resume file.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isEdit - Flag to indicate if the form is for editing an existing resume.
 * @param {File[]} props.selectedFile - An array of selected resume files.
 * @param {function} props.setSelectedFile - A function to update the selected resume files.
 * @param {ButtonProps} props - Additional button props to pass down to the 'Save' button.
 * @returns {JSX.Element} The ResumeForm component.
 */
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
