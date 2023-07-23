import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'

/**
 * PasswordSection Component
 *
 * This component provides a section to change the user's password.
 * When the "Edit" button is clicked, it opens the password edit form in a drawer. The component takes the `seekerId` prop, which is used
 * to identify the user whose password is being changed.
 *
 * @param {Object} props - The component props.
 * @param {string | undefined} props.seekerId - The ID of the seeker whose password is being changed.
 * @returns {JSX.Element} The password section component.
 */
const PasswordSection = ({ seekerId }: { seekerId: string | undefined }) => {
  const dispatch = useAppDispatch()

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Change password
        </Typography>
        <Button
          variant={'contained'}
          onClick={() => dispatch(setDrawerState({ isOpen: true, type: DrawerType.editPasswordForm, content: seekerId }))}
        >
          Edit
        </Button>
      </Box>
    </Box>
  )
}

export default PasswordSection
