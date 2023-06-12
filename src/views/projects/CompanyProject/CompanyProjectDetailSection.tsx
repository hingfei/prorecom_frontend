import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { capitalizeFirstLetter } from '../../../@core/utils/capitalize-first-letter'
import { RhombusMedium } from 'mdi-material-ui'
import React from 'react'

// ** Styled Components
const TextBox = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2)
}))

const DesktopViewBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row'
  }
}))

const MobileViewBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(4)
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(4),
  paddingRight: theme.spacing(10),
  borderRight: `1px solid ${theme.palette.divider}`
}))

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(4),
  paddingLeft: theme.spacing(10)
}))

const CompanyProjectDetailsSection = ({ project }: { project: any }) => {
  return (
    <Card>
      <CardContent>
        {/* Desktop View */}
        <DesktopViewBox>
          <TitleWrapper>
            <Typography variant='body1'>Project Title</Typography>
            <Typography variant='body1'>Project Type</Typography>
            <Typography variant='body1'>Project Status</Typography>
            <Typography variant='body1'>Project Experience Level</Typography>
            <Typography variant='body1'>Project Date</Typography>
            <Typography variant='body1'>Project Description</Typography>
            <Typography variant='body1'>Project Requirements</Typography>
            <Typography variant='body1'>Project Minimum Salary (RM)</Typography>
            <Typography variant='body1'>Project Maximum Salary (RM)</Typography>
            <Typography variant='body1' sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}>
              Project Skills Required
            </Typography>
          </TitleWrapper>
          <ContentWrapper>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectName ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectTypes ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectStatus ? capitalizeFirstLetter(project?.projectStatus) : '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectExpLvl ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.postDates ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectDesc ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectReq ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectMinSalary ?? '-'}
            </Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectMaxSalary ?? '-'}
            </Typography>
            {project?.skills && project?.skills.length > 0 ? (
              <List sx={{ paddingTop: 0 }}>
                {project?.skills.map(skill => {
                  return (
                    <ListItem key={skill.skillId} sx={{ paddingTop: 0 }}>
                      <ListItemIcon>
                        <RhombusMedium />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant={'body1'} fontWeight={500}>
                            {skill.skillName}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            ) : (
              ''
            )}
          </ContentWrapper>
        </DesktopViewBox>

        {/* Mobile View */}
        <MobileViewBox>
          <TextBox>
            <Typography variant='body1'>Project Title</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectName ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Type</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectTypes ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Status</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectStatus ? capitalizeFirstLetter(project?.projectStatus) : '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Experience Level</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectExpLvl ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Date</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.postDates ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Description</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectDesc ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Requirements</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectReq ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Minimum Salary (RM)</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectMinSalary ?? '-'}
            </Typography>
          </TextBox>
          <TextBox>
            <Typography variant='body1'>Project Maximum Salary (RM)</Typography>
            <Typography variant={'body1'} fontWeight={600}>
              {project?.projectMaxSalary ?? '-'}
            </Typography>
          </TextBox>
          {project?.skills && project?.skills.length > 0 ? (
            <TextBox>
              <Typography variant='body1' sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}>
                Project Skills Required
              </Typography>
              <List sx={{ paddingTop: 0 }}>
                {project?.skills.map(skill => {
                  return (
                    <ListItem key={skill.skillId} sx={{ paddingTop: 0 }}>
                      <ListItemIcon>
                        <RhombusMedium />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant={'body1'} fontWeight={500}>
                            {skill.skillName}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            </TextBox>
          ) : (
            ''
          )}
        </MobileViewBox>
      </CardContent>
    </Card>
  )
}

export default CompanyProjectDetailsSection
