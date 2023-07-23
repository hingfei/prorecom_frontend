import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { InformationOutline } from "mdi-material-ui";

/**
 * ProjectDescription Component
 *
 * This component displays the project description in a card format. It includes an information icon followed by
 * the title "Project Description" and the actual description text.
 *
 * @param {Object} props - The component props.
 * @param {string | null | undefined} props.projectDesc - The project description to be displayed.
 * @returns {JSX.Element} The ProjectDescription component.
 */
const ProjectDescription = ({ projectDesc }: { projectDesc: string | null | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <InformationOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Project Description
          </Typography>
        </Box>
        <Typography variant={'body1'}>{projectDesc}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProjectDescription
