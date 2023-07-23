import { Box, Button, ButtonProps, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import { CalendarInput, SelectInput, SwitchInput, TextInput } from '../../../@core/components/custom-inputs'
import { projectExpLevelListing, projectStatusListing, projectTypesListing } from '../../../constants'
import { useRouter } from 'next/router'
import { useSkillListingQuery } from '../../../graphql/api'
import DropdownSkeleton from '../../../@core/components/skeleton/DropdownSkeleton'
import { MinusIcon, PlusIcon } from '../../../@core/components/icons'

/**
 * ProjectForm Component
 *
 * This component displays a form to add or edit a project. It includes inputs for project details such as title,
 * type, experience level, description, requirements, salary, skills required, and status.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.isEdit] - A boolean indicating whether the form is used for editing an existing project.
 * @returns {JSX.Element} The ProjectForm component.
 */
const ProjectForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const router = useRouter()
  const { control, setValue } = useFormContext()

  const skills = useWatch({
    name: 'skills',
    defaultValue: []
  })

  const onCancel = () => {
    router.back()
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
      <Grid item xs={12}>
        <TextInput
          inputProps={{ label: 'Project Title' }}
          controllerProps={{
            control,
            name: 'projectName'
          }}
          isRequired
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectInput
          selectProps={{ label: 'Project Type' }}
          controllerProps={{
            control,
            name: 'projectTypes'
          }}
          selectData={projectTypesListing.map(item => ({
            label: item,
            value: item
          }))}
          isRequired
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectInput
          selectProps={{ label: 'Experience Level' }}
          controllerProps={{
            control,
            name: 'projectExpLvl'
          }}
          selectData={projectExpLevelListing.map(item => ({
            label: item,
            value: item
          }))}
          isRequired
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          inputProps={{ label: 'Description', multiline: true }}
          controllerProps={{
            control,
            name: 'projectDesc'
          }}
          isRequired
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          inputProps={{ label: 'Requirements', multiline: true }}
          controllerProps={{
            control,
            name: 'projectReq'
          }}
          isRequired
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextInput
          inputProps={{ label: 'Minimum Salary (Optional)' }}
          controllerProps={{
            control,
            name: 'projectMinSalary'
          }}
          isNumber
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextInput
          inputProps={{ label: 'Maximum Salary (Optional)' }}
          controllerProps={{
            control,
            name: 'projectMaxSalary'
          }}
          isNumber
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Skills Required'
            titleTypographyProps={{
              color: 'rgba(58, 53, 65, 0.68)',
              fontWeight: '400 !important',
              fontSize: '18px !important'
            }}
          />

          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <SwitchInput
          controllerProps={{
            control,
            name: 'projectStatus'
          }}
          checkedValue={true}
          checkedLabel={'Active'}
          unCheckedValue={false}
          unCheckedLabel={'Closed'}
          label={'Project Status'}
        />
      </Grid>

      <Grid item my={10}>
        <Button variant='contained' {...props}>
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </Grid>
      <Grid item my={10}>
        <Button onClick={onCancel} color='secondary' variant='outlined'>
          Cancel
        </Button>
      </Grid>
    </>
  )
}

export default ProjectForm
