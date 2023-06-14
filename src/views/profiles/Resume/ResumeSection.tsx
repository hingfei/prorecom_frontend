import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch } from '../../../store'

const ResumeSection = ({ jobSeeker, seekerId, viewOnly }: { jobSeeker: any; seekerId: string | undefined; viewOnly: boolean }) => {
  const dispatch = useAppDispatch()

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Resume
        </Typography>
        {!viewOnly && (
          <Button variant={'contained'} disabled>
            Edit
          </Button>
        )}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
        {jobSeeker?.seekerResume ? (
          <Typography variant={'body1'}>{jobSeeker?.seekerResume}</Typography>
        ) : (
          <Typography variant={'body2'}>Add your resume now</Typography>
        )}
      </Box>
    </Box>
  )
}

export default ResumeSection
