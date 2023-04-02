import { useTheme } from '@mui/material/styles'
import { SelectInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const genderSelect = [
  {
    label: 'Male',
    value: 'male'
  },
  { label: 'Female', value: 'female' }
]

const JobSeekerForm = ({ onClick, changeStep }: { onClick?: any; changeStep?: (val: number) => void }) => {
  const theme = useTheme()

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
              name: 'seeker_name'
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
                name: 'seeker_age'
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
                name: 'seeker_gender'
              }}
              selectData={genderSelect}
              isRequired
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextInput
              inputProps={{
                label: 'Birth Date',
                placeholder: 'DD/MM/YYYY'
              }}
              controllerProps={{
                control,
                name: 'seeker_birthdate'
              }}
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
                name: 'seeker_phone_no'
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
              name: 'seeker_street'
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
                name: 'seeker_city'
              }}
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6} mb={4}>
            <TextInput
              inputProps={{
                label: 'State'
              }}
              controllerProps={{
                control,
                name: 'seeker_state'
              }}
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
        <Button fullWidth variant='contained' onClick={onClick} size={'large'}>
          Join Now
        </Button>
      </Box>
    </>
  )
}

export default JobSeekerForm
