import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { capitalizeFirstLetter } from '../../../@core/utils/capitalize-first-letter'
import { RhombusMedium } from 'mdi-material-ui'
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
  alignItems: 'center'
}))

const CompanyProjectDetailsSection = ({ project }: { project: any }) => {
  return (
    <Card>
      <CardContent>
        <Box display={'flex'} flexDirection={'column'} rowGap={4}>
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
              <Typography variant='body1' sx={{ alignSelf: 'flex-start' }}>
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
        </Box>
      </CardContent>
    </Card>
  )
}

export default CompanyProjectDetailsSection
