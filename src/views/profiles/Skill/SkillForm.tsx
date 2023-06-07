import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { SelectInput } from '../../../@core/components/custom-inputs'
import { useSkillListingQuery } from '../../../graphql/api'
import DropdownSkeleton from '../../../@core/components/skeleton/DropdownSkeleton'
import { MinusIcon, PlusIcon } from '../../../@core/components/icons'

const SkillForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control, setValue } = useFormContext()

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
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    setValue('skills', updatedSkills)
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
            key={`${index}-${skill?.value}`}
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
              <MinusIcon color={'error'} onClick={() => removeSkill(index)} aria-controls='remove-skill' />
            </Grid>
          </Grid>
        ))
      ) : (
        ''
      )}
      <Box display='flex' justifyContent='center' mt={6} mb={2}>
        <PlusIcon color='info' onClick={addSkill} aria-controls='add-skill' />
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
