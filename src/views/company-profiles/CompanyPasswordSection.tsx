import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from "../../store";
import { DrawerType } from "../../constants";

const CompanyPasswordSection = ({ companyId }: { companyId: string | undefined }) => {
  const dispatch = useAppDispatch()

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant={'h5'} fontWeight={700}>
          Change password
        </Typography>
        <Button
          variant={'contained'}
          onClick={() => dispatch(setDrawerState({ isOpen: true, type: DrawerType.editPasswordForm, content: companyId }))}
        >
          Edit
        </Button>
      </Box>
    </Box>
  )
}

export default CompanyPasswordSection
