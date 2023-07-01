import React, { ReactNode } from 'react'
import { Box, CardContent, Typography, Badge, BadgeProps } from '@mui/material'
import Chip from '@mui/material/Chip'
import { styled, useTheme } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Card, { CardProps } from '@mui/material/Card'
import { ProjectType } from '../../graphql/api'
import { CurrencyUsd, Domain, MapMarkerOutline } from 'mdi-material-ui'
import { convertToPercentage } from 'src/@core/utils/convert-to-percentage'
import ThumbUpOutline from 'mdi-material-ui/ThumbUpOutline'

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
    backgroundColor: theme.palette.info.light,
  },
}))

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

const ProjectListing = ({
  projectListing,
  project,
  onChangeProject
}: {
  projectListing: any
  project: ProjectType | undefined
  onChangeProject: (item: any) => void
}) => {
  const theme = useTheme()

  return (
    <ScrollWrapper>
      {projectListing.map((item: any) => (
        <StyledCard
          key={item.projectId}
          sx={{
            marginBottom: 7,
            border:
              project?.projectId === item.projectId
                ? `1px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.grey[300]}`
          }}
          onClick={() => onChangeProject(item)}
        >
          <CardContent sx={{ paddingX: 6, paddingY: 5 }}>
            <Box display={'flex'} justifyContent={'space-between'} >
              <Typography variant={'h6'} fontWeight={700}>
                {item.projectName}
              </Typography>
              {item.similarityScore && (
                <StyledBadge badgeContent={<ThumbUpOutline fontSize='small'/>} color='info'>
                  <Chip
                    size='medium'
                    variant='outlined'
                    label={convertToPercentage(item.similarityScore)}
                    color='info'
                    sx={{ fontSize: '14px', fontWeight: 500, borderRadius: '18px'}}
                  />
              </StyledBadge>

              )}
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={5}>
              <Box display={'flex'} alignItems={'center'}>
                <Domain fontSize={'small'} sx={{ mr: 1 }} />
                <Typography variant={'body1'}>{item.company?.companyName}</Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <MapMarkerOutline fontSize={'small'} sx={{ mr: 1 }} />
                <Typography variant={'body1'}>{item.company?.companyState}</Typography>
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Chip
                size='medium'
                variant='outlined'
                label={item.projectTypes}
                color='primary'
                sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
              />
              <Box display={'flex'} alignItems={'center'}>
                <CurrencyUsd fontSize={'small'} sx={{ mr: 1 }} />
                {item?.projectMinSalary != null && item?.projectMaxSalary != null ? (
                  <Typography variant={'body1'}>
                    RM{item?.projectMinSalary} - RM{item?.projectMaxSalary}
                  </Typography>
                ) : item?.projectMinSalary != null && item?.projectMaxSalary == null ? (
                  <Typography variant={'body1'}>RM{item?.projectMinSalary}</Typography>
                ) : (
                  <Typography variant={'body1'}>Undisclosed</Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </ScrollWrapper>
  )
}

export default ProjectListing
