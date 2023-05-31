import { Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { SelectInput, TextInput } from '../../../@core/components/custom-inputs'
import { projectExpLevelListing, projectStatusListing, projectTypesListing } from '../../../constants'
import { useRouter } from 'next/router'

const ProjectForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const router = useRouter()
  const { control } = useFormContext()

  const onCancel = () => {
    router.push('/company-dashboard')
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
      <Grid item xs={12} sm={6} md={3}>
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
      <Grid item xs={12} sm={6} md={3}>
        <SelectInput
          selectProps={{ label: 'Project Status' }}
          controllerProps={{
            control,
            name: 'projectStatus'
          }}
          selectData={projectStatusListing}
          isRequired
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
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
      {/*TODO: TO BE REMOVED, AUTOMATICALLY SET CURRENT DATE*/}
      <Grid item xs={12} sm={6} md={3}>
        <TextInput
          inputProps={{ label: 'Date' }}
          controllerProps={{
            control,
            name: 'postDates'
          }}
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
      <Grid item my={10}>
        <Button
          variant='contained'
          {...props}
        >
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
