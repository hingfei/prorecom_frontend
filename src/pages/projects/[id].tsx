import { Grid } from '@mui/material'
import { getCookie } from 'cookies-next'
import { NextPageContext } from 'next/types'
import PageHeader from '../../@core/components/page-header'
import { ProjectDetailDocument, ProjectDetailQuery, useProjectDetailQuery } from '../../graphql/api'
import { authConfig } from '../../configs/auth'
import { client } from '../../@core/utils/create-apollo-client'
import CompanyProjectDetailsSection from '../../views/projects/CompanyProject/CompanyProjectDetailSection'
import Spinner from '../../@core/components/spinner'
import withAuth from '../../@core/hooks/withAuth'
import { useRouter } from 'next/router'
import RecommendedJobSeekerSection from '../../views/projects/CompanyProject/RecommendationJobSeeker/RecommendedJobSeekerSection'
import { useEffect, useState } from 'react'

const CompanyProjectDetails = ({ projectId, ssrData }: { projectId: number; ssrData: ProjectDetailQuery }) => {
  const router = useRouter()
  const [userType, setUserType] = useState(null)

  const { data: csrData, loading } = useProjectDetailQuery({
    variables: { projectId: projectId },
    fetchPolicy: 'cache-and-network'
  })

  const data = csrData == undefined ? ssrData : csrData

  useEffect(() => {
    const data = window.localStorage.getItem('userData')
    let userData
    if (data) {
      userData = JSON.parse(data)
      setUserType(userData.userType)
    }
  }, [])

  return loading ? (
    <Spinner />
  ) : (
    <Grid container spacing={6}>
      {userType === 'companies' ? (
        <PageHeader
          title={'Project Details'}
          linkTitle={'Edit Project'}
          onLinkClick={() =>
            router.push({
              pathname: '/projects/edit-project',
              query: { id: projectId }
            })
          }
        />
      ) : (
        <PageHeader title={'Project Details'} />
      )}

      <Grid item xs={12}>
        <CompanyProjectDetailsSection project={data?.projectDetail} />
      </Grid>

      {userType === 'companies' && (
        <>
          <PageHeader title={'Potential Candidates'} />
          <Grid item xs={12}>
            <RecommendedJobSeekerSection
              projectId={projectId}
              applications={data?.projectDetail?.projectApplications}
              project={data?.projectDetail}
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

CompanyProjectDetails.title = 'Location Detail'

export default withAuth(CompanyProjectDetails, ['companies', 'job_seekers'])

export async function getServerSideProps(ctx: NextPageContext | undefined) {
  const token = getCookie(authConfig.storageTokenKeyName, ctx)
  const projectId = parseInt((ctx?.query?.id as string) || '')
  try {
    const data = await client.query<ProjectDetailQuery>({
      fetchPolicy: 'network-only',
      query: ProjectDetailDocument,
      variables: {
        projectId: projectId
      },
      context: {
        headers: {
          Authorization: token
        }
      }
    })

    if (!data?.data?.projectDetail) {
      throw Error('Not Found')
    }

    return {
      props: {
        ssrData: data?.data,
        projectId: projectId
      }
    }
  } catch (error: any) {
    if (error?.message == 'Permission Denied!') {
      return {
        props: [],
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
    if (error?.message === 'Not Found') {
      return {
        props: [],
        notFound: true
      }
    }

    return {
      props: [],
      redirect: {
        destination: '/500',
        permanent: false
      }
    }
  }
}
