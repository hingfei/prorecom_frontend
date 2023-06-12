import React from 'react'
import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { CogOutline, RhombusMedium } from 'mdi-material-ui'
import { SkillType } from '../../../../../graphql/api'

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
