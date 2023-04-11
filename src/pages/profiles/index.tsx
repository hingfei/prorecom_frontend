import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useJobSeekerDetailQuery } from '../../graphql/api'
import Chip from '@mui/material/Chip'
import Spinner from '../../@core/components/spinner'
import { useRouter } from "next/router";
import { useState } from "react";

const Profile = () => {
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();
  // const { userId } = router.query;
  //
  // if (!userId) {
  //   return <Spinner />
  // } else {
  //   setLoading(false)
  // }
  //
  // const { data, loading: detailLoading } = useJobSeekerDetailQuery({
  //   variables: {
  //     seekerId: parseInt(userId)
  //   },
  //   fetchPolicy: 'no-cache'
  // })

  return (
    <Grid container spacing={6}>
      {/*<Grid item xs={4.5}>*/}
      {/*  <Card>*/}
      {/*    <CardContent sx={{ paddingX: 6, paddingY: 5 }}>*/}
      {/*      <Typography variant={'h6'} fontWeight={700}>*/}
      {/*        {item.projectName}*/}
      {/*      </Typography>*/}
      {/*      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={5}>*/}
      {/*        <Typography variant={'body2'}>{item.company?.companyName}</Typography>*/}
      {/*        <Typography variant={'body2'}>{item.company?.companyState}</Typography>*/}
      {/*      </Box>*/}
      {/*      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>*/}
      {/*        <Chip*/}
      {/*          size='medium'*/}
      {/*          variant='outlined'*/}
      {/*          label={item.projectTypes}*/}
      {/*          color='primary'*/}
      {/*          sx={{ fontSize: '13px', fontWeight: 500, borderRadius: '18px' }}*/}
      {/*        />*/}
      {/*        <Typography variant={'body2'}>{item.projectSalary}</Typography>*/}
      {/*      </Box>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={7.5}>*/}
      {/*  <Card>*/}
      {/*    <CardContent>*/}
      {/*      <Box mb={14}>*/}
      {/*        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>*/}
      {/*          <Typography variant={'h5'} fontWeight={700}>*/}
      {/*            {project?.projectName ?? '-'}*/}
      {/*          </Typography>*/}
      {/*          <Button variant={'contained'}>Apply</Button>*/}
      {/*        </Box>*/}
      {/*        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>*/}
      {/*          <Typography variant={'body1'}>{project?.company?.companyName ?? '-'}</Typography>*/}
      {/*          <Typography variant={'body1'}>{project?.company?.companyFounder}</Typography>*/}
      {/*        </Box>*/}
      {/*        <Typography variant={'body2'} pb={2}>*/}
      {/*          {project?.company?.companySize ? `${project?.company?.companySize} employer` : ''}*/}
      {/*        </Typography>*/}
      {/*        <Box pb={5}>*/}
      {/*          <Typography variant={'body2'}>{project?.company?.companyStreet}</Typography>*/}
      {/*          <Typography variant={'body2'}>{project?.company?.companyCity}</Typography>*/}
      {/*          <Typography variant={'body2'}>{project?.company?.companyState}</Typography>*/}
      {/*        </Box>*/}
      {/*      </Box>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</Grid>*/}
    </Grid>
  )
}

export default Profile
