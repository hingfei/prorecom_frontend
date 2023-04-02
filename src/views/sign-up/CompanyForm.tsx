import { useTheme } from '@mui/material/styles'
import { SelectInput, TextInput } from 'src/@core/components/custom-inputs'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const companySize = [
  { label: '0 - 10', value: 'extra_small' },
  { label: '11 - 50', value: 'small' },
  { label: '51 - 200', value: 'medium' },
  { label: '201 - 500', value: 'large' },
  { label: '501 - 1000', value: 'extra_large' }
]

const CompanyForm = ({ onClick, changeStep }: { onClick?: any; changeStep?: (val: number) => void }) => {
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
              name: 'company_name'
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
                name: 'company_founder'
              }}
              isRequired
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              selectProps={{ label: 'Company Size' }}
              controllerProps={{
                control,
                name: 'company_size'
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
              name: 'company_street'
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
                name: 'company_city'
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
                name: 'company_state'
              }}
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
              name: 'company_desc'
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
        <Button fullWidth variant='contained' onClick={onClick} size={'large'}>
          Join Now
        </Button>
      </Box>
    </>
  )
}

export default CompanyForm
