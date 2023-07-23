import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'

/**
 * AboutSection Component
 *
 * This component displays the "About" section for a user. It allows users to view their own "About" information
 * and edit it if they are not in view-only mode.
 *
 * @param {object} props - The props object that contains the aboutData, seekerId, and viewOnly properties.
 * @param {string | null | undefined} props.aboutData - The "About" information of the user.
 * @param {string | undefined} props.seekerId - The ID of the seeker (user).
 * @param {boolean} props.viewOnly - Flag to indicate whether the component is in view-only mode (true) or not (false).
 * @returns {JSX.Element} The "About" section component displaying the user's information and an edit button if applicable.
 */
const AboutSection = ({
  aboutData,
  seekerId,
  viewOnly
}: {
  aboutData: string | null | undefined
  seekerId: string | undefined
  viewOnly: boolean
}) => {
  const dispatch = useAppDispatch()

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          About
        </Typography>
        {!viewOnly && (
          <Button
            variant={'contained'}
            onClick={() =>
              dispatch(setDrawerState({ isOpen: true, type: DrawerType.editAboutForm, content: seekerId }))
            }
          >
            Edit
          </Button>
        )}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
        {aboutData ? (
          <Typography variant={'body1'} sx={{ whiteSpace: 'pre-line' }}>
            {aboutData}
          </Typography>
        ) : (
          <Typography variant={'body2'}>No information is provided</Typography>
        )}
      </Box>
    </Box>
  )
}

export default AboutSection
