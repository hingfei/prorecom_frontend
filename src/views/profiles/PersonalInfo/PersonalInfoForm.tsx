import { Box, Button, ButtonProps, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { closeDrawerState, useAppDispatch } from '../../../store'
import { CalendarInput, SelectInput, SwitchInput, TextInput } from '../../../@core/components/custom-inputs'
import { genderSelect, statesListing } from '../../../constants'

const PersonalInfoForm = ({ isEdit, ...props }: ButtonProps & { isEdit?: boolean }) => {
  const dispatch = useAppDispatch()
  const { control } = useFormContext()

  const onCancel = () => {
    dispatch(closeDrawerState())
  }

  return (
    <>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Name' }}
          controllerProps={{
            control,
            name: 'seekerName'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{ label: 'Age' }}
          controllerProps={{
            control,
            name: 'seekerAge'
          }}
          isNumber
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <TextInput
          inputProps={{
            label: 'Phone No.'
          }}
          controllerProps={{
            control,
            name: 'seekerPhoneNo'
          }}
          isNumber
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
      <Grid item mt={6} mb={2}>
        <CalendarInput
          controllerProps={{
            control,
            name: 'seekerBirthdate'
          }}
          label='Date of Birth'
          isRequired
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{ label: 'Gender' }}
          controllerProps={{
            control,
            name: 'seekerGender'
          }}
          selectData={genderSelect}
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
            name: 'seekerStreet'
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
            name: 'seekerCity'
          }}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SelectInput
          selectProps={{ label: 'State' }}
          controllerProps={{
            control,
            name: 'seekerState'
          }}
          selectData={statesListing.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Grid>
      <Grid item mt={6} mb={2}>
        <SwitchInput
          controllerProps={{
            control,
            name: 'seekerIsOpenForWork'
          }}
          checkedValue={true}
          checkedLabel={'Open For Work'}
          unCheckedValue={false}
          unCheckedLabel={'Closed For Work'}
          label={'Availability For Work'}
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

export default PersonalInfoForm
