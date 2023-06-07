import { styled } from '@mui/material/styles'
import { Box, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import { RhombusMedium } from 'mdi-material-ui'
import { ReactNode } from 'react'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { ProjectType } from '../../../graphql/api'
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";
import ProjectRequirement from "./ProjectRequirement";
import ProjectSkills from "./ProjectSkills";
import ProjectExperience from "./ProjectExperience";

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '117vh',
  padding: '0 16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
})

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

const ProjectDetails = ({ project }: { project: ProjectType | undefined }) => {
  return (
    <ScrollWrapper>
      <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
        <CardContent>
          <Box mb={14}>
            <ProjectTitle project={project} />
          </Box>

          <Box mb={10} paddingX={8}>
            <ProjectDescription projectDesc={project?.projectDesc}/>
          </Box>

          <Box mb={10} paddingX={8}>
            <ProjectRequirement projectReq={project?.projectReq} />
          </Box>

          <Box mb={10} paddingX={8}>
            <ProjectSkills project={project} />
          </Box>

          <Box paddingX={8} mb={5}>
            <ProjectExperience projectExpLvl={project?.projectExpLvl} />
          </Box>
        </CardContent>
      </Card>
    </ScrollWrapper>
  )
}

export default ProjectDetails
