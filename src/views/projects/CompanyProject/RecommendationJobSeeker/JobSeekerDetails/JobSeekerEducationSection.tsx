import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { SchoolOutline } from 'mdi-material-ui'
import { EducationType } from '../../../../../graphql/api'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { convertEducLevel } from '../../../../../@core/utils/convert-educ-level'
import { convertFieldofStudy } from '../../../../../@core/utils/convert-field-study'

// ** Styled Components
const TextBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const JobSeekerEducationSection = ({ educations }: { educations: Array<EducationType> | undefined }) => {
  return (
    <Card>
      <CardContent sx={{ padding: '24px 36px !important' }}>
        <Box display={'flex'} alignItems={'center'} pb={4}>
          <SchoolOutline sx={{ mr: 2 }} />
          <Typography variant={'h6'} fontWeight={600}>
            Educations
          </Typography>
        </Box>
        {educations && educations.length > 0 ? (
          educations.map((education, index) => {
            return (
              <Grid key={index} container display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Grid item xs={12}>
                  <Card sx={{ marginBottom: 4 }}>
                    <CardContent>
                      <Box width={'100%'} display={'flex'} flexDirection={'column'} rowGap={'16px'}>
                        <TextBox>
                          <Typography variant='body1'>Education Institution</Typography>
                          <Typography variant={'body1'} fontWeight={600}>
                            {education?.educationInstitution ?? '-'}
                          </Typography>
                        </TextBox>
                        <TextBox>
                          <Typography variant='body1' alignSelf={'flex-start'}>Education Level</Typography>
                          <Typography variant={'body1'} fontWeight={600} sx={{ width: '50%', textAlign: 'right' }}>
                            {convertEducLevel(education.educationLevel) ?? '-'}
                          </Typography>
                        </TextBox>
                        <TextBox>
                          <Typography variant='body1'>Field of Study</Typography>
                          <Typography variant={'body1'} fontWeight={600}>
                            {convertFieldofStudy(education.fieldOfStudy) ?? '-'}
                          </Typography>
                        </TextBox>
                        <TextBox>
                          <Typography variant='body1'>Graduation Year</Typography>
                          <Typography variant={'body1'} fontWeight={600}>
                            {education.graduationYear ?? '-'}
                          </Typography>
                        </TextBox>
                        {education.grade && (
                          <TextBox>
                            <Typography variant='body1'>Grade</Typography>
                            <Typography variant={'body1'} fontWeight={600}>
                              {education.grade ?? '-'}
                            </Typography>
                          </TextBox>
                        )}
                        <TextBox>
                          <Typography variant='body1'>Description</Typography>
                          <Typography variant={'body1'} fontWeight={600}>
                            {education.description ?? '-'}
                          </Typography>
                        </TextBox>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )
          })
        ) : (
          <Typography variant={'body2'}>No information is provided.</Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default JobSeekerEducationSection
