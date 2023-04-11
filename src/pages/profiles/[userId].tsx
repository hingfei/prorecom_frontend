import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useJobSeekerDetailQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PageHeader from '../../@core/components/page-header'
import Divider from '@mui/material/Divider'
import EducationSection from '../../views/profiles/Education/EducationSection'
import PersonalInfoSection from '../../views/profiles/PersonalInfo/PersonalInfoSection'
import ResumeSection from '../../views/profiles/Resume/ResumeSection'
import AboutSection from '../../views/profiles/About/AboutSection'
import PasswordSection from "../../views/profiles/Password/PasswordSection";

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { userId } = router.query

  const { data, loading: detailLoading } = useJobSeekerDetailQuery({
    variables: {
      seekerId: parseInt(userId)
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (userId) {
      setLoading(false)
    }
  }, [userId])

  if (detailLoading || loading) {
    return <Spinner />
  }

  return (
    <Grid container spacing={6}>
      <PageHeader title={'Profile'} />
      <Grid item xs={12} md={5} lg={4}>
        <Card>
          <CardContent sx={{ py: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', rowGap: '6px' }}>
            <PersonalInfoSection seekerId={data?.jobSeekerDetail?.seekerId} jobSeeker={data?.jobSeekerDetail} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Card>
          <CardContent sx={{ py: 10, px: '32px !important' }}>
            <AboutSection aboutData={data?.jobSeekerDetail?.seekerAbout} seekerId={data?.jobSeekerDetail?.seekerId} />
            <Divider sx={{ mb: 5 }} />

            <EducationSection
              edu={data?.jobSeekerDetail?.seekerHighestEduc}
              seekerId={data?.jobSeekerDetail?.seekerId}
            />
            <Divider sx={{ mb: 5 }} />

            <ResumeSection jobSeeker={data?.jobSeekerDetail} seekerId={data?.jobSeekerDetail?.seekerId} />
            <Divider sx={{ mb: 5 }} />

            <PasswordSection seekerId={data?.jobSeekerDetail?.seekerId} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
