import { styled, useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { ProjectType, useProjectListingQuery } from '../../graphql/api'
import { CardProps } from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Spinner from '../../@core/components/spinner'
import { RhombusMedium } from 'mdi-material-ui'

// ** Styled Components
const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  cursor: 'pointer'
}))

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '100vh',
  padding: '16px',
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
})

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
}

function Projects() {
  const theme = useTheme()
  const [project, setProject] = useState<ProjectType>()
  const { data, loading } = useProjectListingQuery({
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (data) {
      setProject(data.projectListing[0])
    }
  }, [data])

  if (loading) {
    return <Spinner />
  }

  const onChangeProject = (project: ProjectType) => {
    setProject(project)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={4.5}>
        <ScrollWrapper>
          {data?.projectListing.map(item => (
            <StyledCard
              key={item.projectId}
              sx={{
                marginBottom: 7,
                border:
                  project?.projectId === item.projectId
                    ? `1px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.grey[300]}`
              }}
              onClick={() => onChangeProject(item)}
            >
              <CardContent sx={{ paddingX: 6, paddingY: 5 }}>
                <Typography variant={'h6'} fontWeight={700}>
                  {item.projectName}
                </Typography>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={5}>
                  <Typography variant={'body2'}>{item.company?.companyName}</Typography>
                  <Typography variant={'body2'}>{item.company?.companyState}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Chip
                    size='medium'
                    variant='outlined'
                    label={item.projectTypes}
                    color='primary'
                    sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
                  />
                  <Typography variant={'body2'}>{item.projectSalary}</Typography>
                </Box>
              </CardContent>
            </StyledCard>
          ))}
        </ScrollWrapper>
      </Grid>
      <Grid item xs={7.5}>
        <ScrollWrapper>
          <Card sx={{ borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid' }}>
            <CardContent>
              <Box mb={14}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
                  <Typography variant={'h5'} fontWeight={700}>
                    {project?.projectName ?? '-'}
                  </Typography>
                  <Button variant={'contained'}>
                    Apply
                  </Button>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
                  <Typography variant={'body1'}>{project?.company?.companyName ?? '-'}</Typography>
                  <Typography variant={'body1'}>{project?.company?.companyFounder}</Typography>
                </Box>
                <Typography variant={'body2'} pb={2}>
                  {project?.company?.companySize ? `${project?.company?.companySize} employer` : ''}
                </Typography>
                <Box pb={5}>
                  <Typography variant={'body2'}>{project?.company?.companyStreet}</Typography>
                  <Typography variant={'body2'}>{project?.company?.companyCity}</Typography>
                  <Typography variant={'body2'}>{project?.company?.companyState}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Chip
                    size='medium'
                    variant='outlined'
                    label={project?.projectTypes}
                    color='primary'
                    sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}
                  />
                  <Typography variant={'body2'}>{project?.projectSalary}</Typography>
                </Box>
                <Typography variant={'body2'} textAlign={'end'}>
                  {project?.postDates}
                </Typography>
              </Box>

              <Box mb={10} paddingX={8}>
                <Card>
                  <CardContent sx={{ padding: '24px 36px !important' }}>
                    <Typography variant={'h6'} fontWeight={600} pb={4}>
                      Project Description
                    </Typography>
                    <Typography variant={'body2'}>{project?.projectDesc}</Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box mb={10} paddingX={8}>
                <Card>
                  <CardContent sx={{ padding: '24px 36px !important' }}>
                    <Typography variant={'h6'} fontWeight={600} pb={4}>
                      Project Requirement
                    </Typography>
                    <Typography variant={'body2'}>{project?.projectReq}</Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box mb={10} paddingX={8}>
                <Card>
                  <CardContent sx={{ padding: '24px 36px !important' }}>
                    <Typography variant={'h6'} fontWeight={600}>
                      Skills Required
                    </Typography>
                    <List>
                      {project?.skills.map(skill => {
                        return (
                          <ListItem key={skill.skillId}>
                            <ListItemIcon>
                              <RhombusMedium />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant={'body2'} fontWeight={500}>
                                  {skill.skillName}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Box>

              <Box paddingX={8} mb={5}>
                <Card>
                  <CardContent sx={{ padding: '24px 36px !important' }}>
                    <Typography variant={'h6'} fontWeight={600} pb={4}>
                      Experience Level
                    </Typography>
                    <Typography variant={'body2'}>{project?.projectReq}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </ScrollWrapper>
      </Grid>
    </Grid>
  )
}

export default Projects
