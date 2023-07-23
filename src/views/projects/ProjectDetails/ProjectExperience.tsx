import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { StarCheckOutline } from 'mdi-material-ui'

/**
 * ProjectExperience Component
 *
 * This component displays the experience level of a project using Material-UI's Card component. It includes a star icon
 * followed by the experience level text.
 *
 * @param {Object} props - The component props.
 * @param {string | null | undefined} props.projectExpLvl - The experience level of the project.
 * @returns {JSX.Element} The ProjectExperience component.
 */
const ProjectExperience = ({ projectExpLvl }: { projectExpLvl: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <StarCheckOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Experience Level
          </Typography>
        </Box>
        <Typography variant={'body1'}>{projectExpLvl}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectExperience
