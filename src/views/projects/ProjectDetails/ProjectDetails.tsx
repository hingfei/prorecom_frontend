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

// ** Styled Components
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '120vh',
  padding: '0 16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  },
  width: '100%'
})

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

/**
 * ProjectDetails Component
 *
 * This component displays the details of a project using Material-UI's Card component. It includes various sub-components
 * such as ProjectTitle, ProjectDescription, ProjectRequirement, ProjectSkills, and ProjectExperience to display different
 * aspects of the project.
 *
 * @param {Object} props - The component props.
 * @param {ProjectType | undefined} props.project - The project object to display its details.
 * @param {any} props.applications - The applications data for the project.
 * @param {any} props.jobSeeker - The job seeker data for the project.
 * @returns {JSX.Element} The ProjectDetails component.
 */
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
