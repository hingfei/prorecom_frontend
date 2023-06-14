import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { generateGenderIcon } from '../../../@core/utils/generate-gender-icon'
import Avatar from '@mui/material/Avatar'
import dayjs from 'dayjs'
import Chip from '@mui/material/Chip'
import React from 'react'

// ** Styled Components
const TextBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}))

const AddressWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
}))

export const renderUserAvatar = () => {
  return (
    <Avatar
      alt='avatar'
      sx={{
        width: 120,
        height: 'auto',
        fontWeight: 600,
        fontSize: '3rem'
      }}
      src='/images/avatars/1.png'
    />
  )
}

const PersonalInfoSection = ({ jobSeeker, seekerId, viewOnly }: { jobSeeker: any; seekerId: string | undefined; viewOnly: boolean }) => {
  const dispatch = useAppDispatch()

  return (
    <>
      {renderUserAvatar()}
      <Typography variant={'h4'} fontWeight={700} sx={{ mt: 4, mb: 2 }}>
        {jobSeeker?.seekerName ?? ''}
      </Typography>
      <Chip
        size='medium'
        variant='outlined'
        label={jobSeeker?.seekerIsOpenForWork ? 'Open For Work' : 'Closed For Work'}
        color={jobSeeker?.seekerIsOpenForWork ? 'info' : 'secondary'}
        sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px', mb: 4 }}
      />
      <Box width={'100%'} display={'flex'} flexDirection={'column'} rowGap={'16px'}>
        <TextBox>
          <Typography variant='body1'>Age</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {jobSeeker.seekerAge + ' Years old'}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Phone Number</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {'+60' + jobSeeker.seekerPhoneNo}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Email</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {jobSeeker.users?.userEmail}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Date of Birth</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {dayjs(jobSeeker.seekerBirthdate).format('DD MMM YYYY')}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Gender</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {generateGenderIcon(jobSeeker.seekerGender)}
          </Typography>
        </TextBox>
        <AddressWrapper>
          <Typography variant='body1'>Address</Typography>
          <Box sx={{ display: 'flex', alignItems: { xs: 'center', sm: 'flex-end' }, flexDirection: 'column' }}>
            <Typography variant={'body1'} fontWeight={600} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              {jobSeeker.seekerStreet}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {jobSeeker.seekerCity}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {jobSeeker.seekerState}
            </Typography>
          </Box>
        </AddressWrapper>
      </Box>
      {!viewOnly && (
        <Button
          variant={'contained'}
          size='large'
          sx={{ mt: 5, mb: 4 }}
          onClick={() =>
            dispatch(
              setDrawerState({
                isOpen: true,
                type: DrawerType.editJobSeekerForm,
                content: seekerId
              })
            )
          }
        >
          Edit
        </Button>
      )}
    </>
  )
}

export default PersonalInfoSection
