import { Box, Button, ButtonProps, Grid, IconButton } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { SelectInput } from '../../../@core/components/custom-inputs'
import { useSkillListingQuery } from '../../../graphql/api'
import DropdownSkeleton from '../../../@core/components/skeleton/DropdownSkeleton'
import { MinusCircleOutline, PlusCircleOutline } from 'mdi-material-ui'

const SkillForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control, getValues, setValue } = useFormContext()

  const skills = useWatch({
    name: 'skills',
    defaultValue: []
  })

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  const { data, loading } = useSkillListingQuery({
    fetchPolicy: 'no-cache'
  })

  const removeSkill = (index: number) => {
    const updatedSkills = getValues('skills')
    updatedSkills.splice(index, 1)
    setValue('skills', updatedSkills)
    console.log('updated', updatedSkills)
  }

  const addSkill = () => {
    const newSkills = [...skills, { value: '' }]
    setValue('skills', newSkills)
  }

  return (
    <>
      {loading ? (
        <DropdownSkeleton />
      ) : skills.length > 0 ? (
        skills.map((skill: any, index: number) => (
          <Grid
            container
            mt={6}
            mb={2}
            key={index}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Grid item xs={10} sm={11}>
              <SelectInput
                controllerProps={{
                  control,
                  name: `skills[${index}]`
                }}
                selectProps={{ label: `Skill ${index + 1}` }}
                selectData={data?.skillListing?.map(item => ({
                  label: item?.skillName,
                  value: item?.skillId
                }))}
              />
            </Grid>
            <Grid item>
              <IconButton
                color='inherit'
                aria-haspopup='true'
                onClick={() => removeSkill(index)}
                aria-controls='remove-skill'
                sx={{
                  color: 'error.light',
                  '&:hover': {
                    color: 'error.dark'
                  }
                }}
              >
                <MinusCircleOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))
      ) : (
        ''
      )}
      <Box display='flex' justifyContent='center' mt={6} mb={2}>
        <IconButton
          color='inherit'
          aria-haspopup='true'
          onClick={addSkill}
          aria-controls='add-skill'
          sx={{
            color: 'info.light',
            '&:hover': {
              color: 'info.dark'
            }
          }}
        >
          <PlusCircleOutline />
        </IconButton>
      </Box>

      <Box display='flex' justifyContent='center' py={10}>
        <Button
          variant='contained'
          sx={{
            mr: 2
          }}
          {...props}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
        <Button onClick={onCancel} color='secondary' variant='outlined'>
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default SkillForm
