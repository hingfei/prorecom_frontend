import { Box, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { RhombusMedium } from 'mdi-material-ui'
import React from 'react'
import dayjs from "dayjs";

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

const RowWrapper = styled(Grid)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`
}))

/**
 * CompanyProjectDetailsSection Component
 *
 * This component displays project details in both desktop and mobile views using styled components.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.project - The project details to display.
 * @returns {JSX.Element} The CompanyProjectDetailsSection component.
 */
const CompanyProjectDetailsSection = ({ project }: { project: any }) => {
  return (
    <Card>
      <CardContent>
        {/* Desktop View */}
        <DesktopViewBox>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Title</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectName ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Type</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectTypes ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Status</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectStatus ? 'Active' : 'Closed'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Experience Level</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectExpLvl ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Date</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {dayjs(project?.postDates).format('DD MMM YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Description</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectDesc ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Requirements</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectReq ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Minimum Salary (RM)</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectMinSalary ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1'>Project Maximum Salary (RM)</Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
                  <Typography variant={'body1'} fontWeight={600}>
                    {project?.projectMaxSalary ?? '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <RowWrapper item sm={4} md={3} lg={2.5}>
                  <Typography variant='body1' sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}>
                    Project Skills Required
                  </Typography>
                </RowWrapper>
                <Grid item sm={8} md={9}>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
              {project?.projectStatus ? 'Active' : 'Closed'}
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
