import { Box, Grid, Typography } from '@mui/material'
import {
  CompanyProjectListingDocument,
  ProjectListingQuery,
  useCompanyProjectListingLazyQuery,
  useDeleteProjectMutation,
  useMeQuery
} from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import PageHeader from '../../@core/components/page-header'
import { onCompleted, onError } from '../../@core/utils/response'
import { useRouter } from 'next/router'
import { useState } from 'react'
import withAuth from '../../@core/hooks/withAuth'
import DataGrid from '../../@core/datagrid'
import generateSkeletonColumns from '../../@core/utils/generate-skeleton-columns'
import { setDrawerState, useAppDispatch } from '../../store'
import { DrawerType } from '../../constants'
import { DeleteIcon, ViewIcon } from '../../@core/components/icons'
import { DialogDeleteLayout } from '../../@core/components/dialog'
import { mapEmptyRows } from '../../@core/utils/map-empty-rows'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'
import { useAuth } from '../../@core/context/authContext'

type ProjectListingCellType = {
  row: NonNullable<ProjectListingQuery['projectListing']>[0]
}

const ActionsRow = ({ row }: ProjectListingCellType) => {
  const router = useRouter()
  const [dialog, setDialog] = useState(false)

  const [projectDelete, { loading }] = useDeleteProjectMutation({
    variables: {
      projectId: parseInt(row?.projectId)
    },
    onCompleted: data => onCompleted(data?.deleteProject, () => setDialog(false)),
    onError: error => onError(error),
    refetchQueries: [CompanyProjectListingDocument]
  })

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ViewIcon
          title='View'
          onClick={e => {
            e.stopPropagation()
            router.push(`/company-dashboard/${row?.projectId}`)
          }}
          color={'primary'}
        />
        <DeleteIcon
          title='Delete'
          onClick={e => {
            e.stopPropagation()
            setDialog(true)
          }}
          color='error'
        />
      </Box>
      <DialogDeleteLayout
        isOpen={dialog}
        onClose={() => setDialog(false)}
        dialogTitle={'Delete Project'}
        dialogContext={`Are you sure you want to delete the project '${row?.projectName}'?`}
        onSubmit={projectDelete}
        disabled={loading}
      />
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
    renderCell: ({ row }: ProjectListingCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {row?.projectName ?? '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'projectDesc',
    headerName: 'Project Description',
    sortable: false,
    renderCell: ({ row }: ProjectListingCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant='body2'
            fontWeight={600}
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {row?.projectDesc ?? '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.04,
    minWidth: 100,
    field: 'projectStatus',
    headerName: 'Status',
    sortable: false,
    renderCell: ({ row }: ProjectListingCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {row?.projectStatus ? capitalizeFirstLetter(row?.projectStatus) : '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'postDates',
    headerName: 'Post Date',
    sortable: false,
    renderCell: ({ row }: ProjectListingCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {row?.postDates ?? '-'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.03,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: ProjectListingCellType) => <ActionsRow row={row} />
  }
]

const CompanyDashboard = () => {
  const [loading, setLoading] = useState(true)
  const skeletonColumns = generateSkeletonColumns(columns)
  const router = useRouter()
  const { resetStore } = useAuth()

  const { data: userData } = useMeQuery({
    onCompleted: data => {
      console.log('data,', data)
      fetchProject({ variables: { companyId: parseInt(data?.me?.userId) } })
    },
    onError: error => {
      console.log(error)
      resetStore()
      router.push('/401')
      onError(error, undefined)
    },
    fetchPolicy: 'no-cache'
  })

  const [fetchProject, { data }] = useCompanyProjectListingLazyQuery({
    onCompleted: data => {
      console.log('company data', data)
      setLoading(false)
    },
    onError: error => {
      router.push('/404')
      onError(error, undefined)
    },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={'Project Management'}
        linkTitle={'Add Project'}
        onLinkClick={() =>
          router.push({
            pathname: '/projects/add-project',
            query: { id: userData?.me?.userId }
          })
        }
      />
      <DataGrid
        key={`data-grid${data?.companyProjectListing.length}`}
        columns={loading ? skeletonColumns : columns}
        rows={loading ? mapEmptyRows() : data?.companyProjectListing || []}
        getRowId={row => (loading ? row?.id : `${row?.projectId}-${row?.projectName}`)}
        rowCount={data?.companyProjectListing.length}
        listingTitle={''}
      />
    </Grid>
  )
}

export default withAuth(CompanyDashboard, ['companies'])
