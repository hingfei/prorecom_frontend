import { Card, CardContent, Grid } from '@mui/material'
import { useJobSeekerDetailLazyQuery, useMeQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import PageHeader from '../../@core/components/page-header'
import Divider from '@mui/material/Divider'
import EducationSection from '../../views/profiles/Education/EducationSection'
import PersonalInfoSection from '../../views/profiles/PersonalInfo/PersonalInfoSection'
import ResumeSection from '../../views/profiles/Resume/ResumeSection'
import AboutSection from '../../views/profiles/About/AboutSection'
import PasswordSection from '../../views/profiles/Password/PasswordSection'
import { onError } from '../../@core/utils/response'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SkillSection from '../../views/profiles/Skill/SkillSection'
import withAuth from '../../@core/hooks/withAuth'
import { useAuth } from '../../@core/context/authContext'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { resetStore } = useAuth()

  const { data: userData } = useMeQuery({
    onCompleted: data => {
      console.log('data,', data)
      fetchJobSeeker({ variables: { seekerId: parseInt(data?.me?.userId) } })
    },
    onError: error => {
      console.log(error)
      resetStore()
      router.push('/401')
      onError(error, undefined)
    },
    fetchPolicy: 'no-cache'
  })

  const [fetchJobSeeker, { data }] = useJobSeekerDetailLazyQuery({
    onCompleted: data => {
      setLoading(false)
    },
    onError: error => {
      router.push('/404')
      onError(error, undefined)
    }
  })

  if (loading) {
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
              educations={data?.jobSeekerDetail?.educations}
              seekerId={data?.jobSeekerDetail?.seekerId}
            />
            <Divider sx={{ mb: 5 }} />

            <SkillSection skills={data?.jobSeekerDetail?.skills} seekerId={data?.jobSeekerDetail?.seekerId} />
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

export default withAuth(Profile, ['job_seekers'])
