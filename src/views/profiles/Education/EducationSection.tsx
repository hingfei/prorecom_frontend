import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType, eduLevelSelect, fieldStudySelect } from '../../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { EducationType, JobSeekerDetailDocument, useDeleteEducationMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'
import { DialogDeleteLayout } from '../../../@core/components/dialog'
import { useState } from 'react'
import { EditIcon, MinusIcon } from '../../../@core/components/icons'

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

const EducationSection = ({
  educations,
  seekerId
}: {
  educations: Array<EducationType> | undefined
  seekerId: string | undefined
}) => {
  const [dialog, setDialog] = useState(false)
  const dispatch = useAppDispatch()

  const convertEducLevel = (level: number) => {
    const result = eduLevelSelect.find(item => item.value === level)
    if (result) {
      return result.label
    }

    return '-'
  }

  const convertFieldofStudy = (field: number) => {
    const result = fieldStudySelect.find(item => item.value === field)
    if (result) {
      return result.label
    }

    return '-'
  }

  const [deleteEducationMutation, { loading }] = useDeleteEducationMutation({
    onCompleted: data =>
      onCompleted(data?.deleteEducation, () => {
        setDialog(false)
      }),
    onError: error => {
      onError(error, undefined)
    },
    refetchQueries: [JobSeekerDetailDocument]
  })

  const onDeleteEducation = (id: any) => {
    deleteEducationMutation({
      variables: {
        educationId: id
      }
    })
  }

  return (
    <Box mb={5}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
        <Typography variant={'h5'} fontWeight={700}>
          Education
        </Typography>
        <Button
          variant={'contained'}
          onClick={() =>
            dispatch(
              setDrawerState({
                isOpen: true,
                type: DrawerType.addEducationForm,
                content: seekerId
              })
            )
          }
        >
          Add
        </Button>
      </Box>
      {educations && educations.length > 0 ? (
        educations.map((education, index) => {
          return (
            <Grid key={index} container display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Grid item xs={10} sm={11}>
                <Card sx={{ marginBottom: 4 }}>
                  <CardContent>
                    <Box width={'100%'} display={'flex'} flexDirection={'column'} rowGap={'16px'}>
                      <TextBox>
                        <Typography variant='body1'>Education Institution</Typography>
                        <Typography variant={'body1'} fontWeight={600}>
                          {education.educationInstitution ?? '-'}
                        </Typography>
                      </TextBox>
                      <TextBox>
                        <Typography variant='body1'>Education Level</Typography>
                        <Typography variant={'body1'} fontWeight={600}>
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
              <Grid item>
                <Box display={'flex'} flexDirection={'column'} rowGap={4}>
                  <EditIcon
                    color={'info'}
                    onClick={() =>
                      dispatch(
                        setDrawerState({
                          isOpen: true,
                          type: DrawerType.editEducationForm,
                          content: { seekerId: seekerId, eduId: education.educationId }
                        })
                      )
                    }
                    disabled={loading}
                  />
                  <MinusIcon
                    color={'error'}
                    aria-controls='remove-education'
                    onClick={e => {
                      e.stopPropagation()
                      setDialog(true)
                    }}
                    disabled={loading}
                  />
                </Box>
              </Grid>
              <DialogDeleteLayout
                isOpen={dialog}
                onClose={() => setDialog(false)}
                dialogTitle={'Delete Education'}
                dialogContext={`Are you sure you want to delete the selected education?`}
                onSubmit={() => onDeleteEducation(education.educationId)}
                disabled={loading}
              />
            </Grid>
          )
        })
      ) : (
        <Typography variant={'body2'}>Add your education now</Typography>
      )}
    </Box>
  )
}

export default EducationSection
