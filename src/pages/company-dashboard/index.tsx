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
import { DeleteIcon, EditIcon } from '../../@core/components/icons'
import { DialogDeleteLayout } from '../../@core/components/dialog'
import { mapEmptyRows } from '../../@core/utils/map-empty-rows'
import { capitalizeFirstLetter } from "../../@core/utils/capitalize-first-letter";

const dummyData = [
  {
    projectId: '2',
    projectName: 'Business Development Associate (Corporate Sales)',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '8 days ago',
    projectMinSalary: 3000,
    projectMaxSalary: 10000,
    projectDesc:
      "Candidates with zero experience are welcome to apply! [ Part of Hiredly's #ZeroHero Campaign - hiredly.com/zerohero ]\n\nWe are opening up an opportunity for business development professionals who want to be part of something bigger than yourself.\n\nIn this role, you will be bridging corporate demand to bring more stable income to our home-chefs.\n\nIf you find meaning in driving impact in your professional life, you are best suited for this role.\n\nWe are looking for candidates with more than 1 year of working experience in related field. However fresh graduates are encouraged to apply if you think you can make the cut.",
    projectExpLvl: '1 - 3 Years of Experience',
    projectStatus: "active",
    skills: [
      {
        skillName: 'Business Development'
      },
      {
        skillName: 'Negotiation'
      },
      {
        skillName: 'Presentations'
      },
      {
        skillName: 'Persuasive Communication'
      },
      {
        skillName: 'Organizational '
      },
      {
        skillName: 'Lead Generation'
      },
      {
        skillName: 'Outbound Calls'
      },
      {
        skillName: 'Sales'
      },
      {
        skillName: 'Closing (Sales)'
      },
      {
        skillName: 'Multitasking'
      }
    ]
  },
  {
    projectId: '132',
    projectName: 'Operations Associate',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectDesc:
      'Join us in a meaningful career, knowing that every second spent on your work is directly contributing to empowering local moms and pops to make a living from home selling food & groceries.\n\nIf you are someone who is compassionate, obsessed with “making it right”, join us as a Operation Associate.\n\nJob Title: Operations Executive (Sales Support)\n\nWe are looking for an experienced and detail-oriented Operations Executive to join our dynamic team. As an Operations Executive, you will be responsible for supporting the Sales team in a range of activities. Your role will involve everything from logistics planning and arrangement to simple marketing tasks, as well as responding to client requests and ensuring that all documentation and data entry tasks are completed accurately and on time.',
    projectStatus: "active",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  },
  {
    projectId: '133',
    projectName: 'Operations Associate 2',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectStatus: "active",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  },
  {
    projectId: '134',
    projectName: 'Operations Associate 3',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectStatus: "active",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  },
  {
    projectId: '135',
    projectName: 'Operations Associate 4',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectStatus: "closed",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  },
  {
    projectId: '136',
    projectName: 'Operations Associate 5',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectStatus: "active",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  },
  {
    projectId: '137',
    projectName: 'Operations Associate 6',
    companyId: '2',
    projectTypes: 'Full-Time',
    postDates: '2 months ago',
    projectMinSalary: 2500,
    projectMaxSalary: 3500,
    projectStatus: "closed",
    projectExpLvl: '4 - 8 Years of Experience',
    skills: []
  }
]

type ProjectListingCellType = {
  row: NonNullable<ProjectListingQuery['projectListing']>[0]
}

const ActionsRow = ({ row }: ProjectListingCellType) => {
  const [dialog, setDialog] = useState(false)
  const dispatch = useAppDispatch()

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
        <EditIcon
          title='Edit'
          onClick={e => {
            e.stopPropagation()
            dispatch(
              setDrawerState({
                isOpen: true,
                type: DrawerType.editProject,
                content: { user_id: row?.projectId }
              })
            )
          }}
          color={'info'}
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
            {capitalizeFirstLetter(row?.projectStatus) ?? '-'}
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

  const { data: userData } = useMeQuery({
    onCompleted: data => {
      console.log('data,', data)
      fetchProject({ variables: { companyId: parseInt(data?.me?.userId) } })
    },
    onError: error => {
      console.log(error)
      router.push('/401')
      onError(error, undefined)
    }
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
      <PageHeader title={'Project Management'} linkTitle={'Add Project'} onLinkClick={() => router.push({ pathname: '/projects/add-project', query: { id: userData?.me?.userId } }) }/>
      <DataGrid
        key={`data-grid${dummyData.length}`}
        columns={loading ? skeletonColumns : columns}
        rows={loading ? mapEmptyRows() : dummyData || []}
        getRowId={row => (loading ? row?.id : `${row?.projectId}-${row?.projectName}`)}
        rowCount={dummyData.length}
        listingTitle={''}
      />
    </Grid>
  )
}

export default withAuth(CompanyDashboard, ['companies'])
