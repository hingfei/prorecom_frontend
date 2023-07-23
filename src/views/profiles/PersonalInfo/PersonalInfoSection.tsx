import { Box, Button, Typography } from '@mui/material'
import { closeDrawerState, setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { generateGenderIcon } from '../../../@core/utils/generate-gender-icon'
import dayjs from 'dayjs'
import Chip from '@mui/material/Chip'
import React from 'react'
import UserAvatar from '../../../@core/components/user-avatar'
import { JobSeekerDetailDocument, useUploadSeekerProfilePicMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'

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

/**
 * PersonalInfoSection Component
 *
 * This component displays the personal information of a job seeker. It includes the seeker's name, profile picture, age, phone number, email,
 * date of birth, gender, and address. The component allows the user to upload or change the profile picture. The `generateGenderIcon` function
 * is used to display the appropriate gender icon based on the seeker's gender. The component also displays a chip indicating whether the seeker
 * is open for work or closed for work. If the `viewOnly` prop is true, the component displays the information in read-only mode without the
 * "Edit" button. Otherwise, the "Edit" button allows the user to update the personal information.
 *
 * @param {{
 *   jobSeeker: any,
 *   seekerId: string | undefined,
 *   viewOnly: boolean
 * }} props - The props of the component.
 * @returns {JSX.Element} The PersonalInfoSection component.
 */
const PersonalInfoSection = ({
  jobSeeker,
  seekerId,
  viewOnly
}: {
  jobSeeker: any
  seekerId: string | undefined
  viewOnly: boolean
}) => {
  const dispatch = useAppDispatch()

  const [uploadProfilePic, { loading }] = useUploadSeekerProfilePicMutation({
    onCompleted: data =>
      onCompleted(data?.uploadSeekerProfilePic, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [JobSeekerDetailDocument]
  })

  return (
    <>
      <UserAvatar
        loading={loading}
        viewOnly={viewOnly}
        userId={jobSeeker?.seekerId}
        imageUrl={jobSeeker?.seekerProfilePic}
        uploadProfilePic={uploadProfilePic}
      />
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
