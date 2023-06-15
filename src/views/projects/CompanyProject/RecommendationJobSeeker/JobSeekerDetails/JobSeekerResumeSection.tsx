import React from 'react'
import { Box, Button, Card, CardContent, Grid, Link, Typography } from '@mui/material'
import { BookAccountOutline, EyeOutline } from 'mdi-material-ui'

const JobSeekerResumeSection = ({ resume }: { resume: any }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <BookAccountOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Resume
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1} width={'100%'}>
          {resume ? (
            <Grid container alignItems={'center'} justifyContent={'center'} width={'100%'}>
              <Grid item xs={11}>
                <embed
                  src={`/images/jobseekers/resumes/${resume}`}
                  type='application/pdf'
                  width='100%'
                  height='300px'
                />
              </Grid>
              <Grid item mt={4}>
                <Link target={'_blank'} href={`/images/jobseekers/resumes/${resume}`}>
                  <Button variant={'outlined'} startIcon={<EyeOutline />}>
                    View
                  </Button>
                </Link>
              </Grid>
            </Grid>
          ) : (
            <Typography variant={'body1'}>{resume ?? 'No information is provided.'}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobSeekerResumeSection
