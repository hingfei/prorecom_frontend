import { useTheme } from '@mui/material/styles'
import { SelectInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { genderSelect, statesListing } from "../../constants";


const JobSeekerForm = ({
  onClick,
  changeStep,
  isSubmitting
}: {
  onClick?: any
  changeStep?: (val: number) => void
  isSubmitting: boolean
}) => {
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
            <TextInput
              inputProps={{
                label: 'Birth Date',
                placeholder: 'DD/MM/YYYY'
              }}
              controllerProps={{
                control,
                name: 'seekerBirthdate'
              }}
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
