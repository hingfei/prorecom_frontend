import { Box, Button, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../store'
import { DrawerType } from '../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'
import { TypographyProps } from '@mui/material/Typography'

// ** Styled Components
const DescriptionBox = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const DescriptionWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: 'unset'
  }
}))

const DescriptionTitleWrapper = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'inherit'
  },
  alignSelf: 'flex-start'
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
        <DescriptionBox>
          <Typography variant='body1'>Founder</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company?.companyFounder ?? '-'}
          </Typography>
        </DescriptionBox>
        <DescriptionBox>
          <Typography variant='body1'>Enterprise Type</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company?.companySize ? `${capitalizeFirstLetter(company?.companySize)} Enterprise` : '-'}
          </Typography>
        </DescriptionBox>
        <DescriptionBox>
          <Typography variant='body1'>Email</Typography>
          <Typography variant={'body1'} fontWeight={600}>
            {company.users?.userEmail}
          </Typography>
        </DescriptionBox>
        <DescriptionBox>
          <DescriptionTitleWrapper variant='body1'>Company Description</DescriptionTitleWrapper>
          <DescriptionWrapper variant={'body1'} fontWeight={600}>
            {company?.companyDesc ?? '-'}
          </DescriptionWrapper>
        </DescriptionBox>
        <DescriptionBox>
          <DescriptionTitleWrapper variant='body1'>Address</DescriptionTitleWrapper>
          <DescriptionWrapper variant={'body1'} fontWeight={600}>
            {company.companyStreet}, {company.companyCity}, {company.companyState}
          </DescriptionWrapper>
        </DescriptionBox>
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
