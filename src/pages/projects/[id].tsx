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

/**
 * Component: CompanyProjectDetails
 *
 * This component displays the details of a specific company project. It fetches the project details using GraphQL
 * queries and supports Server-Side Rendering (SSR). The displayed content and options may vary based on the user type
 * (companies or job_seekers).
 *
 * @param {number} projectId - The ID of the project to display.
 * @param {ProjectDetailQuery} ssrData - The pre-fetched data from SSR to avoid re-fetching when the component mounts.
 */
const CompanyProjectDetails = ({ projectId, ssrData }: { projectId: number; ssrData: ProjectDetailQuery }) => {
  const router = useRouter()
  const [userType, setUserType] = useState(null)

  // Fetch the project details using the useProjectDetailQuery hook from GraphQL with cache-and-network fetch policy
  const { data: csrData, loading } = useProjectDetailQuery({
    variables: { projectId: projectId },
    fetchPolicy: 'cache-and-network'
  })

  // Use the data from SSR if available, otherwise use the freshly fetched data from GraphQL query
  const data = csrData == undefined ? ssrData : csrData

  useEffect(() => {
    // Get user data from localStorage to determine the user type (companies or job_seekers)
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
      {/* Display the page header, and if the user is a company, show an additional 'Edit Project' link */}
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

      {/* If the user is a company, show the 'Potential Candidates' section */}
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

export default withAuth(CompanyProjectDetails, ['companies', 'job_seekers'])

/**
 * Server-Side Rendering (SSR) function for the CompanyProjectDetails component.
 * This function is called on the server-side and fetches the project details using Apollo Client with the provided token.
 *
 * @param {NextPageContext} ctx - The Next.js page context, which includes request information.
 * @returns {Object} - An object with props for the component, including SSR data and the project ID.
 */
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
