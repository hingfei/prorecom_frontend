import React, { ReactNode } from 'react'
import { Box, CardContent, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import { styled, useTheme } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Card, { CardProps } from '@mui/material/Card'
import { ProjectType } from '../../graphql/api'

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
            <Typography variant={'h6'} fontWeight={700}>
              {item.projectName}
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={5}>
              <Typography variant={'body2'}>{item.company?.companyName}</Typography>
              <Typography variant={'body2'}>{item.company?.companyState}</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Chip
                size='medium'
                variant='outlined'
                label={item.projectTypes}
                color='primary'
                sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
              />
              {item?.projectMinSalary != null && item?.projectMaxSalary != null ? (
                <Typography variant={'body2'}>
                  RM{item?.projectMinSalary} - RM{item?.projectMaxSalary}
                </Typography>
              ) : item?.projectMinSalary != null && item?.projectMaxSalary == null ? (
                <Typography variant={'body2'}>RM{item?.projectMinSalary}</Typography>
              ) : (
                <Typography variant={'body2'}>Undisclosed</Typography>
              )}
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </ScrollWrapper>
  )
}

export default ProjectListing
