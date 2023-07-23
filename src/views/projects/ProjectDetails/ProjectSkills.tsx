import React from 'react'
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { CogOutline, RhombusMedium } from 'mdi-material-ui'
import { ProjectType } from '../../../graphql/api'

/**
 * ProjectSkills Component
 *
 * This component displays the skills required for a project using Material-UI's Card component and List component.
 * It includes a cog icon followed by the title "Skills Required" and a list of skills using RhombusMedium icon.
 *
 * @param {Object} props - The component props.
 * @param {ProjectType | undefined} props.project - The project object that includes the skills required for the project.
 * @returns {JSX.Element} The ProjectSkills component.
 */
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
