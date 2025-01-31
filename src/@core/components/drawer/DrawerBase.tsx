import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box, Drawer as MuiDrawer, DrawerProps, IconButton, styled } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { closeDrawerState, useAppDispatch, useAppSelector } from 'src/store'
import { DrawerType } from 'src/constants'
import { perfectScrollbarRef } from 'src/@core/utils/perfect-scrollbar'
import EditEducationForm from '../../../views/profiles/Education/EditEducationForm'
import EditPersonalInfoForm from '../../../views/profiles/PersonalInfo/EditPersonalInfoForm'
import EditAboutForm from '../../../views/profiles/About/EditAboutForm'
import EditPasswordForm from '../../../views/profiles/Password/EditPasswordForm'
import EditSkillForm from '../../../views/profiles/Skill/EditSkillForm'
import AddEducationForm from '../../../views/profiles/Education/AddEducationForm'
import EditCompanyProfileForm from "../../../views/company-profiles/EditCompanyProfileForm";
import EditResumeform from "../../../views/profiles/Resume/EditResumeForm";

// Styling for the custom Drawer component
const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    ['@media (min-width:600px)']: {
      maxWidth: 600
    },
    width: '100%',
    zIndex: theme.zIndex.drawer,
    boxShadow: theme.shadows[9]
  }
}))

const CustomizerSpacing = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 6)
}))

// DrawerBase Component
// This component renders the custom Drawer that can display different forms based on the DrawerType.
const DrawerBase = ({ onCloseCallback }: { onCloseCallback?: () => void }) => {
  // Retrieve the drawer state and dispatch function from the store
  const { isOpen, type } = useAppSelector(state => state.drawer)
  const dispatch = useAppDispatch()

  // Function to render the appropriate form based on the DrawerType
  const renderChildren = () => {
    switch (type) {
      case DrawerType.editJobSeekerForm:
        return <EditPersonalInfoForm />
      case DrawerType.editEducationForm:
        return <EditEducationForm />
      case DrawerType.addEducationForm:
        return <AddEducationForm />
      case DrawerType.editAboutForm:
        return <EditAboutForm />
      case DrawerType.editPasswordForm:
        return <EditPasswordForm />
      case DrawerType.editSkillForm:
        return <EditSkillForm />
      case DrawerType.editCompanyProfile:
        return <EditCompanyProfileForm />
      case DrawerType.editResumeForm:
        return <EditResumeform />
      default:
        return null
    }
  }

  return (
    <div className='customizer'>
      <Drawer open={isOpen} anchor='right' variant='persistent'>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(10, 5, 0, 5)
          }}
        >
          <IconButton
            onClick={() => {
              !!onCloseCallback && onCloseCallback()
              dispatch(closeDrawerState())
            }}
            sx={{
              right: 20,
              top: '80%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        </Box>
        <PerfectScrollbar
          options={{ wheelPropagation: false }}
          containerRef={container => {
            ;(perfectScrollbarRef as any).current = container
          }}
        >
          <CustomizerSpacing className='customizer-body'>{renderChildren()}</CustomizerSpacing>
        </PerfectScrollbar>
      </Drawer>
    </div>
  )
}

export default DrawerBase
