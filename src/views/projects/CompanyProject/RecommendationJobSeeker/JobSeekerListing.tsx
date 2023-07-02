import React, { ReactNode } from 'react'
import { Badge, BadgeProps, Box, CardContent, Chip, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Card, { CardProps } from '@mui/material/Card'
import { JobSeekerType } from '../../../../graphql/api'
import { MapMarkerOutline, PhoneOutline, ThumbUpOutline } from 'mdi-material-ui'
import { convertToPercentage } from 'src/@core/utils/convert-to-percentage'

// ** Styled Components
const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  cursor: 'pointer'
}))

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '100vh',
  padding: '0 16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
})

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    padding: '14px 6px',
    borderRadius: '50%',
    backgroundColor: theme.palette.info.light
  }
}))

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

const JobSeekerListing = ({
  jobSeekerList,
  jobSeeker,
  onChangeJobSeeker
}: {
  jobSeekerList: any
  jobSeeker: JobSeekerType | undefined
  onChangeJobSeeker: (item: any) => void
}) => {
  const theme = useTheme()

  return (
    <ScrollWrapper>
      {jobSeekerList.map((item: any) => (
        <StyledCard
          key={item.seekerId}
          sx={{
            marginBottom: 7,
            border:
              jobSeeker?.seekerId === item.seekerId
                ? `1px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.grey[300]}`
          }}
          onClick={() => onChangeJobSeeker(item)}
        >
          <CardContent sx={{ paddingX: 6, paddingY: 5 }}>
            {/* <Typography variant={'h6'} fontWeight={700} >
              {item.seekerName}
            </Typography> */}
            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
              <Typography variant={'h6'} fontWeight={700}>
                {item.seekerName}
              </Typography>
              {item.similarityScore && (
                <StyledBadge badgeContent={<ThumbUpOutline fontSize='small' />} color='info'>
                  <Chip
                    size='medium'
                    variant='outlined'
                    label={convertToPercentage(item.similarityScore)}
                    color='info'
                    sx={{ fontSize: '14px', fontWeight: 500, borderRadius: '18px' }}
                  />
                </StyledBadge>
              )}
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={'flex'} alignItems={'center'}>
                <PhoneOutline fontSize={'small'} sx={{ mr: 1 }} />
                <Typography variant={'body1'}>+60{item.seekerPhoneNo}</Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <MapMarkerOutline fontSize={'small'} sx={{ mr: 1 }} />
                <Typography variant={'body1'}>{item.seekerState}</Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </ScrollWrapper>
  )
}

export default JobSeekerListing
