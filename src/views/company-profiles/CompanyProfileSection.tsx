import { Box, Button, Typography } from '@mui/material'
import { closeDrawerState, setDrawerState, useAppDispatch } from '../../store'
import { DrawerType } from '../../constants'
import { styled } from '@mui/material/styles'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'
import { TypographyProps } from '@mui/material/Typography'
import UserAvatar from '../../@core/components/user-avatar'
import { CompanyDetailDocument, useUploadCompanyProfilePicMutation } from '../../graphql/api'
import { onCompleted, onError } from '../../@core/utils/response'

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

const CompanyProfileSection = ({
  company,
  companyId,
  viewOnly
}: {
  company: any
  companyId: string | undefined
  viewOnly: boolean
}) => {
  const dispatch = useAppDispatch()

  const [uploadProfilePic, { loading }] = useUploadCompanyProfilePicMutation({
    onCompleted: data =>
      onCompleted(data?.uploadCompanyProfilePic, () => {
        dispatch(closeDrawerState())
      }),
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [CompanyDetailDocument]
  })

  return (
    <>
      <UserAvatar
        viewOnly={viewOnly}
        userId={companyId}
        imageUrl={company.companyProfilePic}
        uploadProfilePic={uploadProfilePic}
        loading={loading}
      />
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
      {!viewOnly && (
        <Button
          variant={'contained'}
          size='large'
          sx={{ mt: 5, mb: 4, alignSelf: 'end' }}
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
      )}
    </>
  )
}

export default CompanyProfileSection
