import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../store'
import { DrawerType } from '../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'
import { TypographyProps } from '@mui/material/Typography'

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

const DescriptionWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: 'unset'
  },
  width: '50%',
  textAlign: 'right'
}))

const DescriptionTitleWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'inherit'
  },
  alignSelf: 'flex-start'
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

const CompanyProfileSection = ({ company, companyId }: { company: any; companyId: string | undefined }) => {
  const dispatch = useAppDispatch()
  console.log('company', company)

  return (
    <>
      {renderUserAvatar()}
      <Typography variant={'h4'} fontWeight={700} sx={{ my: 4 }}>
        {company?.companyName ?? '-'}
      </Typography>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'16px'}
        sx={{ padding: { md: '0 25px', lg: '0 50px' } }}
      >
        <TextBox>
          <Typography variant='body1'>Founder</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company?.companyFounder ?? '-'}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Enterprise Type</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company?.companySize ? `${capitalizeFirstLetter(company?.companySize)} Enterprise` : '-'}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography variant='body1'>Email</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company.users?.userEmail}
          </Typography>
        </TextBox>
        <TextBox>
          <DescriptionTitleWrapper variant='body1'>Company Description</DescriptionTitleWrapper>
          <DescriptionWrapper variant={'body1'} fontWeight={600}>
            {company?.companyDesc ?? '-'}
          </DescriptionWrapper>
        </TextBox>
        <AddressWrapper>
          <Typography variant='body1'>Address</Typography>
          <Box sx={{ display: 'flex', alignItems: { xs: 'center', sm: 'flex-end' }, flexDirection: 'column' }}>
            <Typography variant={'body1'} fontWeight={600}>
              {company.companyStreet}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {company.companyCity}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {company.companyState}
            </Typography>
          </Box>
        </AddressWrapper>
      </Box>

      <Button
        variant={'contained'}
        size='large'
        sx={{ mt: 5, mb: 4 }}
        onClick={() =>
          dispatch(
            setDrawerState({
              isOpen: true,
              type: DrawerType.editCompanyProfile,
              content: companyId
            })
          )
        }
      >
        Edit
      </Button>
    </>
  )
}

export default CompanyProfileSection
