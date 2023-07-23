import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../store'
import { SelectInput, TextInput } from '../../@core/components/custom-inputs'
import { companySize, statesListing } from '../../constants'

/**
 * CompanyProfileForm Component
 *
 * This component displays a form to add or edit company profile details.
 *
 * @param {boolean} isEdit - Flag to determine whether the form is for editing an existing profile.
 * @param {ButtonProps} props - Additional props to be passed to the "Save" button.
 */
const CompanyProfileForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Company Name' }}
          controllerProps={{
            control,
            name: 'companyName'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Company Founder' }}
          controllerProps={{
            control,
            name: 'companyFounder'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{ label: 'Enterprise Type' }}
          controllerProps={{
            control,
            name: 'companySize'
          }}
          selectData={companySize}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Email' }}
          controllerProps={{
            control,
            name: 'userEmail'
          }}
        />
      </Grid>
      <Grid item xs={12} mt={6} mb={2}>
        <TextInput
          inputProps={{
            label: 'Company Description',
            multiline: true
          }}
          controllerProps={{
            control,
            name: 'companyDesc'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{
            label: 'Street',
            multiline: true
          }}
          controllerProps={{
            control,
            name: 'companyStreet'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{
            label: 'City',
            multiline: true
          }}
          controllerProps={{
            control,
            name: 'companyCity'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{ label: 'State' }}
          controllerProps={{
            control,
            name: 'companyState'
          }}
          selectData={statesListing.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Grid>

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

export default CompanyProfileForm
