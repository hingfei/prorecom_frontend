import { useFormContext } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import { Magnify } from 'mdi-material-ui'
import { Box, FormControlLabel, Grid, Switch } from '@mui/material'
import React from 'react'
import { TextInput } from '../../../../@core/components/custom-inputs'

/**
 * SearchJobSeeker Component
 *
 * This component provides a search bar and switch option to search for job seekers and change the listing view mode.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The callback function when the search button is clicked.
 * @param {Object} props.switchOption - The switch option for changing the listing view mode.
 * @param {boolean} props.switchOption.checked - The checked state of the switch.
 * @param {string} props.switchOption.label - The label text of the switch.
 * @param {boolean} props.switchOption.disabled - The disabled state of the switch.
 * @param {Function} props.handleChangeJobSeekerList - The callback function to handle changing the listing view mode.
 * @returns {JSX.Element} The SearchJobSeeker component.
 */
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
