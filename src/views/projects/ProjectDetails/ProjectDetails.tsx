import { styled } from '@mui/material/styles'
import { Box, Card, CardContent } from '@mui/material'
import { ReactNode } from 'react'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { ProjectType } from '../../../graphql/api'
import ProjectTitle from './ProjectTitle'
import ProjectDescription from './ProjectDescription'
import ProjectRequirement from './ProjectRequirement'
import ProjectSkills from './ProjectSkills'
import ProjectExperience from './ProjectExperience'

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '117vh',
  padding: '0 16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  },
  width: '100%'
})

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

const ProjectDetails = ({
  project,
  applications,
  jobSeeker
}: {
  project: ProjectType | undefined
  applications: any
  jobSeeker: any
}) => {
  return (
    <ScrollWrapper>
      <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
        <CardContent>
          <Box mb={14}>
            <ProjectTitle project={project} applications={applications} jobSeeker={jobSeeker} />
          </Box>

          <Box mb={10} paddingX={8}>
            <ProjectDescription projectDesc={project?.projectDesc} />
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
