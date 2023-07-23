import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ViewListOutline } from 'mdi-material-ui'

/**
 * ProjectRequirement Component
 *
 * This component displays the project requirements using Material-UI's Card component. It includes a list icon
 * followed by the project requirement text.
 *
 * @param {Object} props - The component props.
 * @param {string | null | undefined} props.projectReq - The project requirements text.
 * @returns {JSX.Element} The ProjectRequirement component.
 */
const ProjectRequirement = ({ projectReq }: { projectReq: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <ViewListOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Project Requirement
          </Typography>
        </Box>
        <Typography variant={'body1'}>{projectReq}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectRequirement
