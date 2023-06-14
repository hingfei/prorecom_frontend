import { styled } from '@mui/material/styles'
import { Box, Card, CardContent } from '@mui/material'
import { ReactNode } from 'react'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { JobSeekerType } from '../../../../../graphql/api'
import JobSeekerPersonalInfoSection from './JobSeekerPersonalInfoSection'
import JobSeekerAboutSection from "./JobSeekerAboutSection";
import JobSeekerEducationSection from "./JobSeekerEducationSection";
import JobSeekerSkillsSection from "./JobSeekerSkillsSection";
import JobSeekerResumeSection from "./JobSeekerResumeSection";

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

const JobSeekerDetails = ({ jobSeeker }: { jobSeeker: JobSeekerType | undefined }) => {
  return (
    <ScrollWrapper>
      <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
        <CardContent>
          <Box mb={14}>
            <JobSeekerPersonalInfoSection jobSeeker={jobSeeker} />
          </Box>

          <Box mb={10} paddingX={8}>
            <JobSeekerAboutSection seekerAbout={jobSeeker?.seekerAbout} gender={jobSeeker?.seekerGender}/>
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
