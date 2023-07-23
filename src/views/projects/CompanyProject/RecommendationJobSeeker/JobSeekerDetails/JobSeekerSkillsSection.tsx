import React from 'react'
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { CogOutline, RhombusMedium } from 'mdi-material-ui'
import { SkillType } from '../../../../../graphql/api'

/**
 * JobSeekerSkillsSection Component
 *
 * This component displays the list of skills of a job seeker.
 *
 * @param {Object} props - The component props.
 * @param {Array<SkillType> | undefined} props.skills - The array of skills to be displayed.
 * @returns {JSX.Element} The JobSeekerSkillsSection component.
 */
const JobSeekerSkillsSection = ({ skills }: { skills: Array<SkillType> | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <CogOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Skills
          </Typography>
        </Box>
        {/* Check if skills are available */}
        {skills && skills.length > 0 ? (
          <List>
            {skills.map(skill => {
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
        ) : (
          <Typography variant={'body2'}>No information is provided.</Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default JobSeekerSkillsSection
