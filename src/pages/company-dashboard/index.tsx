import {
  CompanyProjectListingDocument,
  CompanyProjectListingQuery,
  useCompanyProjectListingLazyQuery,
  useDeleteProjectMutation,
  useMeQuery,
  useSendNotificationMutation,
  useUpdateApplicationMutation
} from '../../graphql/api'
import Spinner from '../../@core/components/spinner'
import PageHeader from '../../@core/components/page-header'
import { onCompleted, onError } from '../../@core/utils/response'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import withAuth from '../../@core/hooks/withAuth'
import DataGrid from '../../@core/datagrid'
import generateSkeletonColumns from '../../@core/utils/generate-skeleton-columns'
import { CheckIcon, CloseIcon, DeleteIcon, ViewIcon } from '../../@core/components/icons'
import { DialogApplicationLayout, DialogDeleteLayout } from '../../@core/components/dialog'
import { mapEmptyRows } from '../../@core/utils/map-empty-rows'
import { useAuth } from '../../@core/context/authContext'
import dayjs from 'dayjs'
import {
  Box,
  Button,
  Chip,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { AlertCircleOutline } from 'mdi-material-ui'
import Link from 'next/link'
import { capitalizeFirstLetter } from '../../@core/utils/capitalize-first-letter'

type ProjectListingCellType = {
  row: NonNullable<CompanyProjectListingQuery['companyProjectListing']>[0]
}

const ApplicationRow = ({ row }: ProjectListingCellType) => {
  const [dialog, setDialog] = useState(false)

  const [updateApplicationMutation, { loading }] = useUpdateApplicationMutation({
    onCompleted: data => {
      onCompleted(data?.updateApplication, undefined)
    },
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [CompanyProjectListingDocument]
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
          senderId: parseInt(row?.companyId),
          receiverId: parseInt(seekerId),
          message: `${row?.company?.companyName} has responded to your applications`
        }
      }
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip title={'View'}>
          <Chip
            onClick={e => {
              e.stopPropagation()
              setDialog(true)
            }}
            size='medium'
            variant='outlined'
            label={row?.projectApplications?.length > 0 ? row?.projectApplications?.length : 0}
            color={row?.projectApplications?.length > 0 ? 'primary' : 'secondary'}
            sx={{ fontWeight: 500 }}
          />
        </Tooltip>
      </Box>
      <DialogApplicationLayout isOpen={dialog} onClose={() => setDialog(false)}>
        {row?.projectApplications?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color={'#3A3541DE'} fontWeight={500} textTransform={'uppercase'}>
                    Seeker Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={'#3A3541DE'} fontWeight={500} textTransform={'uppercase'}>
                    Application Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={'#3A3541DE'} fontWeight={500} textTransform={'uppercase'}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row?.projectApplications.map(application => (
                <TableRow key={application?.projectApplicationId}>
                  <TableCell>
                    <Link href={{ pathname: 'profiles', query: { id: application?.seekerId } }} passHref>
                      <a target='_blank' style={{ textDecoration: 'unset' }}>
                        <Button variant={'text'}>
                          <Typography variant='body2' fontWeight={600}>
                            {application?.jobSeeker?.seekerName}
                          </Typography>
                        </Button>
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size='medium'
                      variant='outlined'
                      label={capitalizeFirstLetter(application?.applicationStatus)}
                      color={
                        application?.applicationStatus === 'accepted'
                          ? 'success'
                          : application?.applicationStatus === 'rejected'
                          ? 'error'
                          : 'secondary'
                      }
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    {application?.applicationStatus === 'pending' && application?.applicationIsInvited ? (
                      <Typography variant='body2' fontWeight={600}>
                        Invitation has been sent
                      </Typography>
                    ) : application?.applicationStatus === 'pending' && !application?.applicationIsInvited ? (
                      <Box sx={{ display: 'flex', columnGap: 4 }}>
                        <CheckIcon
                          title={'Accept'}
                          color={'primary'}
                          onClick={() =>
                            handleClick(application?.projectApplicationId, 'accepted', application?.seekerId)
                          }
                          disabled={loading}
                        />
                        <CloseIcon
                          title={'Reject'}
                          color={'error'}
                          onClick={() =>
                            handleClick(application?.projectApplicationId, 'rejected', application?.seekerId)
                          }
                          disabled={loading}
                        />
                      </Box>
                    ) : (
                      <Typography variant='body2' fontWeight={600}>
                        No actions can be performed
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={'75%'}>
            <Box>
              <Icon sx={{ fontSize: '100px', display: 'initial' }}>
                <AlertCircleOutline sx={{ fontSize: '100px' }} />
              </Icon>
            </Box>
            <Typography variant={'h5'} fontWeight={600}>
              Opps! No applicant applied to this project.
            </Typography>
          </Box>
        )}
      </DialogApplicationLayout>
    </>
  )
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
            router.push(`/projects/${row?.projectId}`)
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
    flex: 0.08,
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
    flex: 0.1,
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
    flex: 0.05,
    minWidth: 100,
    field: 'projectApplications',
    headerName: 'Applicants',
    sortable: false,
    renderCell: ({ row }: ProjectListingCellType) => <ApplicationRow row={row} />
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
          <Chip
            size='medium'
            variant='outlined'
            label={row?.projectStatus ? 'Active' : 'Closed'}
            color={row?.projectStatus ? 'primary' : 'secondary'}
            sx={{ fontWeight: 500 }}
          />
        </Box>
      )
    }
  },
  {
    flex: 0.04,
    minWidth: 100,
    field: 'postDates',
    headerName: 'Post Date',
    sortable: false,
    renderCell: ({ row }: ProjectListingCellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' fontWeight={600}>
            {dayjs(row?.postDates).format('DD MMM YYYY')}
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
      fetchProject({ variables: { companyId: parseInt(data?.me?.userId) } })
    },
    onError: error => {
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
