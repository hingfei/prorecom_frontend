import { Card, CardContent, Grid } from '@mui/material'
import { useCompanyDetailLazyQuery, useMeLazyQuery } from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import PageHeader from '../../@core/components/page-header'
import { onError } from '../../@core/utils/response'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import withAuth from '../../@core/hooks/withAuth'
import { useAuth } from '../../@core/context/authContext'
import CompanyProfileSection from '../../views/company-profiles/CompanyProfileSection'
import CompanyPasswordSection from '../../views/company-profiles/CompanyPasswordSection'

const CompanyProfile = () => {
  const [loading, setLoading] = useState(true)
  const [viewOnly, setViewOnly] = useState(false)
  const router = useRouter()
  const { resetStore } = useAuth()

  const [fetchMe, { data: userData }] = useMeLazyQuery({
    onCompleted: data => {
      fetchCompany({ variables: { companyId: parseInt(data?.me?.userId) } })
    },
    onError: error => {
      resetStore()
      router.push('/401')
      onError(error, undefined)
    },
    fetchPolicy: 'no-cache'
  })

  const [fetchCompany, { data }] = useCompanyDetailLazyQuery({
    onCompleted: data => {
      setLoading(false)
    },
    onError: error => {
      router.push('/404')
      onError(error, undefined)
    }
  })

  useEffect(() => {
    if (router.query.id) {
      fetchCompany({ variables: { companyId: parseInt(router.query.id) } })
      setViewOnly(true)
    } else {
      fetchMe()
    }
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid container spacing={6} justifyContent={'center'}>
      <Grid item xs={12}>
        <PageHeader title={'Profile'} />
      </Grid>
      <Grid item xs={12} sm={10} lg={8}>
        <Card>
          <CardContent sx={{ py: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', rowGap: '6px' }}>
            <CompanyProfileSection
              companyId={data?.companyDetail?.companyId}
              company={data?.companyDetail}
              viewOnly={viewOnly}
            />
          </CardContent>
        </Card>
      </Grid>
      {!viewOnly && (
        <Grid item xs={12} sm={10} lg={8}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', rowGap: '6px' }}>
              <CompanyPasswordSection companyId={data?.companyDetail?.companyId} />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default withAuth(CompanyProfile, ['companies', 'job_seekers'])
