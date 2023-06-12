import { useFormContext } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import { Magnify } from 'mdi-material-ui'
import { Box, FormControlLabel, Grid, Switch } from '@mui/material'
import React from 'react'
import { TextInput } from '../../../../@core/components/custom-inputs'

const SearchJobSeeker = ({
  onClick,
  switchOption,
  handleChangeJobSeekerList
}: {
  onClick: any
  switchOption?: { checked: boolean; label: string; disabled: boolean }
  handleChangeJobSeekerList?: any
}) => {
  const { control } = useFormContext()

  return (
    <Box>
      <Grid container spacing={6} sx={{ alignItems: 'center', paddingBottom: 6 }}>
        <Grid item xs={12}>
          <TextInput
            inputProps={{
              label: 'Search',
              placeholder: 'Search job seeker',
              autoComplete: 'off'
            }}
            controllerProps={{
              control,
              name: 'searchKeyword'
            }}
            endAdornment={
              <IconButton color='inherit' onClick={onClick}>
                <Magnify />
              </IconButton>
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} xs={12} sx={{ justifyContent: 'space-around', marginBottom: 4 }}>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={switchOption?.checked} />}
            onChange={handleChangeJobSeekerList}
            label={switchOption?.label}
            disabled={switchOption?.disabled}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchJobSeeker
