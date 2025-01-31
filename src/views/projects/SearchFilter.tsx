import { useFormContext } from 'react-hook-form'
import { TextInput } from '../../@core/components/custom-inputs'
import IconButton from '@mui/material/IconButton'
import { FilterMenuOutline, Magnify } from 'mdi-material-ui'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Switch,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { TypographyProps } from '@mui/material/Typography'
import { projectExpLevelListing, projectTypesListing, statesListing } from 'src/constants'

// ** Styled Components
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 70 * 4.5
    }
  }
}

const StyledMenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme, lastchild }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: lastchild ? 'none' : `1px solid ${theme.palette.divider}`
}))

const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: '12px 16px 0',
  fontWeight: 600
}))

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'primary' : 'secondary',
  height: 2,
  padding: '16px 0',
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -4,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none'
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000'
    }
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf'
  }
}))

/**
 * SearchFilter Component
 *
 * This component displays a search bar and filter options for projects. Users can filter projects based on project type,
 * company state, experience levels, and salary range. The filter options are displayed in a dropdown menu.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The function to handle the click event on the search button.
 * @param {Function} props.handleChangeProjectList - The function to handle the change event on the project list.
 * @param {Object} [props.switchOption] - The switch option for project list.
 * @param {never[]} [props.defaultProjectList] - The default list of projects.
 * @param {Dispatch<SetStateAction<never[]>>} [props.setProjectList] - The function to set the list of projects.
 * @param {Dispatch<SetStateAction<number>>} props.setCurrentPage - The function to set the current page.
 * @param {Dispatch<SetStateAction<never[]>>} props.setFilteredProjectList - The function to set the filtered list of projects.
 * @param {Dispatch<SetStateAction<boolean>>} props.setFilterState - The function to set the filter state.
 * @returns {JSX.Element} The SearchFilter component.
 */
const SearchFilter = ({
  onClick,
  handleChangeProjectList,
  switchOption,
  defaultProjectList,
  setProjectList,
  setCurrentPage,
  setFilteredProjectList,
  setFilterState
}: {
  onClick: any
  handleChangeProjectList: any
  switchOption?: { checked: boolean; label: string }
  defaultProjectList?: never[]
  setProjectList?: Dispatch<SetStateAction<never[]>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setFilteredProjectList: Dispatch<SetStateAction<never[]>>
  setFilterState: Dispatch<SetStateAction<boolean>>
}) => {
  const [numFilters, setNumFilters] = useState(0)
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [filterOptions, setFilterOptions] = useState({
    projectType: [],
    companyState: [],
    projectExpLevel: [],
    projectMinSalary: 0
  })

  const { control } = useFormContext()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const valueLabelFormat = (value: number) => {
    return `RM ${value}`
  }

  const handleFilterChange = (filterName: string, selectedOptions: string[] | number[] | number) => {
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      [filterName]: selectedOptions
    }))
  }

  const resetState = () => {
    setFilterOptions({
      projectType: [],
      companyState: [],
      projectExpLevel: [],
      projectMinSalary: 0
    })
    setNumFilters(0)
    setFilteredProjectList([])
    setFilterState(false)
    setProjectList(defaultProjectList.slice(0, 10))
  }

  const handleFilterButtonClick = (type: string) => {
    setCurrentPage(1)
    if (type === 'default') {
      resetState()
    } else {
      const filteredProjects = defaultProjectList?.filter(project => {
        // Check project type filter
        if (filterOptions.projectType.length > 0 && !filterOptions.projectType.includes(project.projectTypes)) {
          return false
        }

        // Check company state filter
        if (
          filterOptions.companyState.length > 0 &&
          !filterOptions.companyState.includes(project.company.companyState)
        ) {
          return false
        }

        // Check project experience level filter
        if (
          filterOptions.projectExpLevel.length > 0 &&
          !filterOptions.projectExpLevel.includes(project.projectExpLvl)
        ) {
          return false
        }

        // Check project salary filter
        if (project.projectMinSalary < filterOptions.projectMinSalary) {
          return false
        }

        // All filters passed, include the project in the filtered list
        return true
      })

      const numItems = Object.values(filterOptions).reduce((total, arr) => {
        if (Array.isArray(arr)) {
          return total + arr.length
        } else {
          if (arr !== 0) {
            return total + 1
          }
        }

        return total
      }, 0) as number
      setNumFilters(numItems)
      setFilteredProjectList(filteredProjects)
      setFilterState(true)
      setProjectList(filteredProjects.slice(0, 10))
    }
    setAnchorEl(null)
  }

  return (
    <Box>
      <Grid container spacing={6} sx={{ alignItems: 'center', paddingBottom: 6 }}>
        <Grid item xs={12}>
          <TextInput
            inputProps={{
              label: 'Search',
              placeholder: 'Search project',
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

      <Grid container spacing={4} maxWidth sx={{ justifyContent: 'space-around', marginBottom: 4 }}>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={switchOption?.checked} onChange={handleChangeProjectList} />}
            label={switchOption?.label}
          />
        </Grid>
        <Grid item>
          <Button
            variant={'outlined'}
            endIcon={
              <Box display={'flex'} alignItems={'center'}>
                {numFilters !== 0 ? (
                  <Chip
                    size='small'
                    variant={'filled'}
                    label={numFilters}
                    color='primary'
                    sx={{ fontSize: '12px', borderRadius: '50%', marginRight: '4px' }}
                  />
                ) : (
                  ''
                )}
                <FilterMenuOutline />
              </Box>
            }
            onClick={handleDropdownOpen}
          >
            Filter
          </Button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleDropdownClose}>
            <MenuItemTitle variant={'body1'}>Project Type</MenuItemTitle>
            <StyledMenuItem>
              <FormControl fullWidth>
                <InputLabel>Project Types</InputLabel>
                <Select
                  multiple
                  value={filterOptions.projectType}
                  input={<OutlinedInput id='select-multiple-chip' label='Project Types' />}
                  onChange={e => handleFilterChange('projectType', e.target.value as string[])}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {projectTypesListing.map(option => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={filterOptions.projectType.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledMenuItem>
            <MenuItemTitle variant={'body1'}>States</MenuItemTitle>
            <StyledMenuItem>
              <FormControl fullWidth>
                <InputLabel>States</InputLabel>
                <Select
                  multiple
                  value={filterOptions.companyState}
                  input={<OutlinedInput id='select-multiple-chip' label='States' />}
                  onChange={e => handleFilterChange('companyState', e.target.value as string[])}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {statesListing.map(option => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={filterOptions.companyState.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledMenuItem>
            <MenuItemTitle variant={'body1'}>Experience Levels</MenuItemTitle>
            <StyledMenuItem>
              <FormControl fullWidth>
                <InputLabel>Experience Levels</InputLabel>
                <Select
                  input={<OutlinedInput id='select-multiple-chip' label='Experience Levels' />}
                  multiple
                  value={filterOptions.projectExpLevel}
                  onChange={e => handleFilterChange('projectExpLevel', e.target.value as string[])}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {projectExpLevelListing.map(option => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={filterOptions.projectExpLevel.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledMenuItem>
            <MenuItemTitle variant={'body1'}>Salary</MenuItemTitle>
            <StyledMenuItem lastchild={true}>
              <FormControl fullWidth>
                <CustomSlider
                  value={filterOptions.projectMinSalary}
                  valueLabelFormat={valueLabelFormat}
                  onChange={(event, value) => handleFilterChange('projectMinSalary', value)}
                  min={0}
                  max={20000}
                  step={100}
                  valueLabelDisplay={'on'}
                  color={'secondary'}
                  sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
                />
              </FormControl>
            </StyledMenuItem>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={'12px'}>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleFilterButtonClick('default')}
                sx={{ marginRight: 4 }}
              >
                Clear
              </Button>

              <Button variant='contained' color='primary' onClick={() => handleFilterButtonClick('filter')}>
                Filter
              </Button>
            </Box>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchFilter
