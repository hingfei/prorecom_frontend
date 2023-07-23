import { styled } from '@mui/material/styles'
import { Box, Card, CardContent } from '@mui/material'
import { ReactNode } from 'react'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { JobSeekerType, ProjectApplicationType, ProjectType } from '../../../../../graphql/api'
import JobSeekerPersonalInfoSection from './JobSeekerPersonalInfoSection'
import JobSeekerAboutSection from './JobSeekerAboutSection'
import JobSeekerEducationSection from './JobSeekerEducationSection'
import JobSeekerSkillsSection from './JobSeekerSkillsSection'
import JobSeekerResumeSection from './JobSeekerResumeSection'

// ** Styled Components
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '117vh',
  width: '100%',
  padding: '0 16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
})

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

/**
 * JobSeekerDetails Component
 *
 * This component displays the details of a job seeker, including personal information, about section,
 * education history, skills, and resume. It provides a structured and organized view of the job seeker's profile.
 *
 * @param {Object} props - The component props.
 * @param {JobSeekerType | undefined} props.jobSeeker - The job seeker's information.
 * @param {Array<ProjectApplicationType>} props.applications - List of applications made by the job seeker.
 * @param {ProjectType} props.project - The project associated with the job seeker's profile.
 * @returns {JSX.Element} The JobSeekerDetails component.
 */
const JobSeekerDetails = ({
  jobSeeker,
  applications,
  project
}: {
  jobSeeker: JobSeekerType | undefined
  applications: Array<ProjectApplicationType>
  project: ProjectType
}) => {
  return (
    <ScrollWrapper>
      <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
        <CardContent>
          <Box mb={14}>
            <JobSeekerPersonalInfoSection jobSeeker={jobSeeker} applications={applications} project={project} />
          </Box>

          <Box mb={10} paddingX={8}>
            <JobSeekerAboutSection seekerAbout={jobSeeker?.seekerAbout} gender={jobSeeker?.seekerGender} />
          </Box>

          <Box mb={10} paddingX={8}>
            <JobSeekerEducationSection educations={jobSeeker?.educations} />
          </Box>

          <Box mb={10} paddingX={8}>
            <JobSeekerSkillsSection skills={jobSeeker?.skills} />
          </Box>

          <Box paddingX={8} mb={5}>
            <JobSeekerResumeSection resume={jobSeeker?.seekerResume} />
          </Box>
        </CardContent>
      </Card>
    </ScrollWrapper>
  )
}

export default JobSeekerDetails
