import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'

const AboutSection = ({
  aboutData,
  seekerId
}: {
  aboutData: string | null | undefined
  seekerId: string | undefined
}) => {
  const dispatch = useAppDispatch()

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          About
        </Typography>
        <Button
          variant={'contained'}
          onClick={() => dispatch(setDrawerState({ isOpen: true, type: DrawerType.editAboutForm, content: seekerId }))}
        >
          Edit
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
        {aboutData ? (
          <Typography variant={'body1'} sx={{whiteSpace: 'pre-line'}}>{aboutData}</Typography>
        ) : (
          <Typography variant={'body2'}>Introduce yourself now</Typography>
        )}
      </Box>
    </Box>
  )
}

export default AboutSection
