import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'

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
