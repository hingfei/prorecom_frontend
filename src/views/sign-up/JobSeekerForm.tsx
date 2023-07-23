import { CalendarInput, SelectInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { genderSelect, statesListing } from "../../constants";

/**
 * JobSeekerForm Component
 *
 * This component displays a form to collect job seeker profile details. Users can enter their name, age, gender,
 * date of birth, phone number, street, city, and state. The form provides validation for required fields.
 *
 * @param {Object} props - The component props.
 * @param {Function} [props.onClick] - The function to handle the click event on the "Join Now" button.
 * @param {Function} [props.changeStep] - The function to change the current step in the multi-step form.
 * @param {boolean} props.isSubmitting - A boolean indicating if the form is being submitted.
 * @returns {JSX.Element} The JobSeekerForm component.
 */
const JobSeekerForm = ({
  onClick,
  changeStep,
  isSubmitting
}: {
  onClick?: any
  changeStep?: (val: number) => void
  isSubmitting: boolean
}) => {
  const { control } = useFormContext()

  return (
    <>
      <Box sx={{ mb: 6 }}>
        <Typography variant='subtitle1' fontWeight={600}>
          Fill in the profile details:
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} mb={4}>
          <TextInput
            inputProps={{
              label: 'Name'
            }}
            controllerProps={{
              control,
              name: 'seekerName'
            }}
            isRequired
          />
        </Grid>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextInput
              inputProps={{
                label: 'Age'
              }}
              controllerProps={{
                control,
                name: 'seekerAge'
              }}
              isNumber
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              selectProps={{ label: 'Gender' }}
              controllerProps={{
                control,
                name: 'seekerGender'
              }}
              selectData={genderSelect}
              isRequired
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6}>
            <CalendarInput
              controllerProps={{
                control,
                name: 'seekerBirthdate'
              }}
              label='Date of Birth'
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              inputProps={{
                label: 'Phone No.'
              }}
              controllerProps={{
                control,
                name: 'seekerPhoneNo'
              }}
              isNumber
              isRequired
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mb={4}>
          <TextInput
            inputProps={{
              label: 'Street',
              multiline: true
            }}
            controllerProps={{
              control,
              name: 'seekerStreet'
            }}
            isRequired
          />
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextInput
              inputProps={{
                label: 'City'
              }}
              controllerProps={{
                control,
                name: 'seekerCity'
              }}
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6} mb={4}>
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
              isRequired
            />
          </Grid>
        </Grid>
      </Grid>

      <Box display='flex' justifyContent='center' sx={{ marginBottom: 7, marginTop: 5 }}>
        <Button
          fullWidth
          color='primary'
          variant='outlined'
          sx={{
            mr: 2
          }}
          onClick={() => changeStep(2)}
          size={'large'}
        >
          Back
        </Button>
        <Button fullWidth variant='contained' onClick={onClick} size={'large'} disabled={isSubmitting}>
          Join Now
        </Button>
      </Box>
    </>
  )
}

export default JobSeekerForm
