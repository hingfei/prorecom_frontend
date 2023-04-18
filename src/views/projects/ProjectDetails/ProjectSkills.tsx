import React from 'react'
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { RhombusMedium } from 'mdi-material-ui'
import { ProjectType } from '../../../graphql/api'

const ProjectSkills = ({ project }: { project: ProjectType | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Typography variant={'h6'} fontWeight={600}>
          Skills Required
        </Typography>
        <List>
          {project?.skills.map(skill => {
            return (
              <ListItem key={skill.skillId}>
                <ListItemIcon>
                  <RhombusMedium />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant={'body2'} fontWeight={500}>
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
