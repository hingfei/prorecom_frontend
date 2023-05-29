import { useTheme } from '@mui/material/styles'
import { SelectInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { companySize, statesListing } from "../../constants";

const CompanyForm = ({
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
          Fill in the company details:
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} mb={4}>
          <TextInput
            inputProps={{
              label: 'Company Name'
            }}
            controllerProps={{
              control,
              name: 'companyName'
            }}
            isRequired
          />
        </Grid>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextInput
              inputProps={{
                label: 'Company Founder'
              }}
              controllerProps={{
                control,
                name: 'companyFounder'
              }}
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              selectProps={{ label: 'Company Size' }}
              controllerProps={{
                control,
                name: 'companySize'
              }}
              selectData={companySize}
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
              name: 'companyStreet'
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
                name: 'companyCity'
              }}
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6} mb={4}>
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
              isRequired
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mb={4}>
          <TextInput
            inputProps={{
              label: 'Company Description',
              multiline: true
            }}
            controllerProps={{
              control,
              name: 'companyDesc'
            }}
            isRequired
          />
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

export default CompanyForm
