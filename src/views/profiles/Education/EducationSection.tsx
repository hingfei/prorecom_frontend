import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { setDrawerState, useAppDispatch } from '../../../store'
import { DrawerType } from '../../../constants'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'
import { EducationType, JobSeekerDetailDocument, useDeleteEducationMutation } from '../../../graphql/api'
import { onCompleted, onError } from '../../../@core/utils/response'
import { DialogDeleteLayout } from '../../../@core/components/dialog'
import { useState } from 'react'
import { EditIcon, MinusIcon } from '../../../@core/components/icons'
import { convertEducLevel } from '../../../@core/utils/convert-educ-level'
import { convertFieldofStudy } from '../../../@core/utils/convert-field-study'

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

/**
 * EducationSection Component
 *
 * This component displays the list of education details for a job seeker. It provides options to view, add, edit, and delete
 * education details. Users can view the list of education information, add new education details, edit existing ones,
 * and delete specific education entries. The component uses the `JobSeekerDetailDocument` query to fetch the job seeker's
 * details and the `useDeleteEducationMutation` mutation to delete an education entry. It also displays a confirmation dialog
 * when deleting an education entry.
 *
 * @param {Array<EducationType>} educations - An array of education details for the job seeker.
 * @param {string | undefined} seekerId - The ID of the job seeker.
 * @param {boolean} viewOnly - Determines whether the component is in view-only mode or not.
 * @returns {JSX.Element} The education section component displaying education information and options.
 */
const EducationSection = ({
  educations,
  seekerId,
  viewOnly
}: {
  educations: Array<EducationType> | undefined
  seekerId: string | undefined
  viewOnly: boolean
}) => {
  const [dialog, setDialog] = useState(false)
  const dispatch = useAppDispatch()

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
        {!viewOnly && (
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
        )}
      </Box>
      {educations && educations.length > 0 ? (
        educations.map((education, index) => {
          return (
            <Grid key={index} container display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Grid item xs>
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
              {!viewOnly && (
                <Grid item xs={2} sm={1}>
                  <Box display={'flex'} flexDirection={'column'} alignItems={'center'} rowGap={4}>
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
              )}
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
        <Typography variant={'body2'}>No information is provided</Typography>
      )}
    </Box>
  )
}

export default EducationSection
