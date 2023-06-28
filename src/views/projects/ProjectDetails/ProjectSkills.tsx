import React from 'react'
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { CogOutline, RhombusMedium } from 'mdi-material-ui'
import { ProjectType } from '../../../graphql/api'

const ProjectSkills = ({ project }: { project: ProjectType | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'}>
          <CogOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Skills Required
          </Typography>
        </Box>
        <List>
          {project?.skills.map(skill => {
            return (
              <ListItem key={skill.skillId}>
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
      </CardContent>
    </Card>
  )
}

export default ProjectSkills
