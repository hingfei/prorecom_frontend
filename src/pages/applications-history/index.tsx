import {
  GetJobSeekerApplicationsDocument,
  GetJobSeekerApplicationsQuery,
  useGetJobSeekerApplicationsQuery,
  useSendNotificationMutation,
  useUpdateApplicationMutation
} from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import { onCompleted, onError } from '../../@core/utils/response'
import withAuth from '../../@core/hooks/withAuth'
import { Box, Button, Grid, Typography } from '@mui/material'
import PageHeader from '../../@core/components/page-header'
import DataGrid from '../../@core/datagrid'
import { mapEmptyRows } from '../../@core/utils/map-empty-rows'
import generateSkeletonColumns from '../../@core/utils/generate-skeleton-columns'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'
import Chip from '@mui/material/Chip'
import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { CheckIcon, CloseIcon } from '../../@core/components/icons'

type ApplicationHistoryCellType = {
  row: NonNullable<GetJobSeekerApplicationsQuery['getJobSeekerApplications']>[0]
}

const ActionsRow = ({ row }: ApplicationHistoryCellType) => {
  const [updateApplicationMutation, { loading }] = useUpdateApplicationMutation({
    onCompleted: data => {
      onCompleted(data?.updateApplication, undefined)
    },
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [GetJobSeekerApplicationsDocument]
  })

  const [sendNotif] = useSendNotificationMutation()

  const handleClick = (applicationId: string, status: string, seekerId: string) => {
    updateApplicationMutation({
      variables: {
        input: {
          projectApplicationId: applicationId,
          applicationStatus: status
        }
      }
    })
    sendNotif({
      variables: {
        input: {
          senderId: parseInt(seekerId),
          receiverId: parseInt(row?.project?.companyId),
          message: `${row?.jobSeeker?.seekerName} has responded to your invitation`
        }
      }
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', columnGap: 4 }}>
          <CheckIcon
            title={'Accept'}
            color={'primary'}
            onClick={() => handleClick(row?.projectApplicationId, 'accepted', row?.seekerId)}
            disabled={loading}
          />
          <CloseIcon
            title={'Reject'}
            color={'error'}
            onClick={() => handleClick(row?.projectApplicationId, 'rejected', row?.seekerId)}
            disabled={loading}
          />
        </Box>
      </Box>
    </>
  )
}

const columns = [
  {
    flex: 0.1,
    minWidth: 200,
    field: 'projectName',
    headerName: 'Project Name',
    sortable: false,
    renderCell: ({ row }: ApplicationHistoryCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href={`/projects/${row?.projectId}`} passHref>
            <a target='_blank' style={{ textDecoration: 'unset' }}>
              <Button variant={'text'}>
                <Typography variant='body2' fontWeight={600}>
                  {row?.project?.projectName ?? '-'}
                </Typography>
              </Button>
            </a>
          </Link>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'companyName',
    headerName: 'Company Name',
    sortable: false,
    renderCell: ({ row }: ApplicationHistoryCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {row?.project?.company?.companyName ?? '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'applicationDate',
    headerName: 'Date',
    sortable: false,
    renderCell: ({ row }: ApplicationHistoryCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {dayjs(row?.applicationDate).format('DD MMM YYYY') ?? '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'applicationStatus',
    headerName: 'Status',
    sortable: false,
    renderCell: ({ row }: ApplicationHistoryCellType) => {
      return row.applicationStatus === 'pending' && row.applicationIsInvited ? (
        <ActionsRow row={row} />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            size='medium'
            variant='outlined'
            label={capitalizeFirstLetter(row?.applicationStatus)}
            color={
              row?.applicationStatus === 'accepted'
                ? 'success'
                : row?.applicationStatus === 'rejected'
                ? 'error'
                : 'secondary'
            }
            sx={{ fontWeight: 500 }}
          />
        </Box>
      )
    }
  }
]

const ApplicationsHistory = () => {
  const skeletonColumns = generateSkeletonColumns(columns)

  const { data, loading } = useGetJobSeekerApplicationsQuery({
    onCompleted: data => {
      // console.log('application', data)
    },
    onError: error => {
      onError(error, undefined)
    },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid container spacing={6}>
      <PageHeader title={'Applications History'} />
      <DataGrid
        key={`data-grid${data?.getJobSeekerApplications.length}`}
        columns={loading ? skeletonColumns : columns}
        rows={loading ? mapEmptyRows() : data?.getJobSeekerApplications || []}
        getRowId={row => (loading ? row?.id : `${row?.projectApplicationId}-${row?.applicationStatus}`)}
        rowCount={data?.getJobSeekerApplications.length}
        listingTitle={''}
      />
    </Grid>
  )
}

export default withAuth(ApplicationsHistory, ['job_seekers'])
