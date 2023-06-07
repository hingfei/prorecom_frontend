import { Grid } from '@mui/material'
import { getCookie } from 'cookies-next'
import { NextPageContext } from 'next/types'
import PageHeader from '../../@core/components/page-header'
import {
  ProjectDetailDocument,
  ProjectDetailQuery,
  useProjectDetailQuery,
  useRecommendedJobSeekerListingQuery
} from '../../graphql/api'
import { authConfig } from '../../configs/auth'
import { client } from '../../@core/utils/create-apollo-client'
import CompanyProjectDetailsSection from '../../views/projects/CompanyProject/CompanyProjectDetailSection'
import Spinner from '../../@core/components/spinner'
import withAuth from "../../@core/hooks/withAuth";
import { useRouter } from "next/router";
import RecommendedJobSeekerSection
  from "../../views/projects/CompanyProject/RecommendationJobSeeker/RecommendedJobSeekerSection";

const CompanyProjectDetails = ({ projectId, ssrData }: { projectId: number; ssrData: ProjectDetailQuery }) => {
  const router = useRouter()
  const { data: csrData, loading } = useProjectDetailQuery({
    variables: { projectId: projectId },
    fetchPolicy: 'cache-and-network'
  })

  const { data: seekerListing, loading: seekerLoading } = useRecommendedJobSeekerListingQuery({
    variables: {
      projectId: projectId
    },
    fetchPolicy: 'no-cache'
  })

  const data = csrData == undefined ? ssrData : csrData

  return (loading || seekerLoading) ? (
    <Spinner/>
  ) : (
    <Grid container spacing={6}>
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
      <Grid item xs={12}>
        <CompanyProjectDetailsSection project={data?.projectDetail}/>
      </Grid>
      <PageHeader title={'Potential Candidates'}/>
      <Grid item xs={12}>
        <RecommendedJobSeekerSection seekerListing={seekerListing}/>
      </Grid>
    </Grid>
  )
}

CompanyProjectDetails.title = 'Location Detail'

export default withAuth(CompanyProjectDetails, ['companies'])

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

    if ( !data?.data?.projectDetail ) {
      throw Error('Not Found')
    }

    return {
      props: {
        ssrData: data?.data,
        projectId: projectId
      }
    }
  } catch (error: any) {
    if ( error?.message == 'Permission Denied!' ) {
      return {
        props: [],
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
    if ( error?.message === 'Not Found' ) {
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
