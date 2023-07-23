import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { SelectInput } from '../../../@core/components/custom-inputs'
import { useSkillListingQuery } from '../../../graphql/api'
import DropdownSkeleton from '../../../@core/components/skeleton/DropdownSkeleton'
import { MinusIcon, PlusIcon } from '../../../@core/components/icons'

/**
 * SkillForm Component
 *
 * This component provides a form for adding or editing job seeker skills.
 * It allows job seekers to select skills from a dropdown list and add or remove them dynamically.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isEdit - A boolean indicating whether the form is for editing an existing skill.
 * @returns {JSX.Element} The SkillForm component.
 */
const SkillForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control, setValue } = useFormContext()

  // Get the current skills array using react-hook-form's useWatch hook
  const skills = useWatch({
    name: 'skills',
    defaultValue: []
  })

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  // Fetch the list of available skills from the server using the useSkillListingQuery
  const { data, loading } = useSkillListingQuery({
    fetchPolicy: 'no-cache'
  })

  // Remove a skill from the skills array at the specified index.
  const removeSkill = (index: number) => {
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    setValue('skills', updatedSkills)
  }

  // Add a new empty skill to the skills array.
  const addSkill = () => {
    const newSkills = [...skills, { value: '' }]
    setValue('skills', newSkills)
  }

  return (
    <>
      {loading ? (
        <DropdownSkeleton />
      ) : skills.length > 0 ? (
        // Map through the skills array to display each skill as a SelectInput component
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
