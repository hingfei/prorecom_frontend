import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  InputProps,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useController } from 'react-hook-form'
import {
  CalendarInputType,
  FormControlBaseType,
  PasswordInputType,
  SelectInputType,
  SwitchInputType,
  TextInputType
} from './index.d'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// -------------------------
// FormControlBase Component
// -------------------------

// A wrapper component for form controls with common styling and error handling.
export const FormControlBase = ({ children, isInvalid, errorMessage, isRequired }: FormControlBaseType) => {
  return (
    <FormControl fullWidth required={isRequired}>
      {children}
      {isInvalid && <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

// -------------------------
// TextInput Component
// -------------------------

// A custom text input component that integrates with 'react-hook-form'.
export const TextInput = ({
  controllerProps,
  inputProps,
  isRequired,
  isNumber,
  isAutofocus,
  onChangeCallback,
  endAdornment,
  startAdornment
}: TextInputType & InputProps) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  // Render the text input wrapped in the FormControlBase for styling and error display.
  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <TextField
        required={Boolean(isRequired)}
        autoFocus={Boolean(isAutofocus)}
        value={value ? value : ''}
        onChange={event => {
          // Convert the input value to a number if isNumber prop is true.
          if (isNumber && !!event?.target?.value) {
            onChange(Number(event?.target?.value))
          } else {
            onChange(event)
          }
          // Call the provided onChangeCallback, if any, on input change.
          !!onChangeCallback && onChangeCallback(event)
        }}
        error={Boolean(error)}
        {...inputProps}
        InputProps={{ endAdornment, startAdornment, inputProps: { min: '0' } }}
      />
    </FormControlBase>
  )
}

// -------------------------
// SelectInput Component
// -------------------------

// A custom select input component that integrates with 'react-hook-form'.
export const SelectInput = ({
  controllerProps,
  selectProps,
  isRequired,
  selectData,
  onChangeCallback
}: SelectInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  // Convert the select input value to an object format required by the Autocomplete component.
  useEffect(() => {
    if (typeof value !== 'object' && value) {
      onChange(selectData?.find(item => item.value === value))
    }
  }, [typeof value !== 'object', JSON.stringify(selectData)])

  // Render the select input wrapped in the FormControlBase for styling and error display.
  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message} isRequired={Boolean(isRequired)}>
      <Autocomplete
        openOnFocus={true}
        isOptionEqualToValue={(option, value) => option.value === value}
        options={selectData || []}
        getOptionLabel={option => option?.label || ''}
        renderInput={params => (
          <TextField
            {...params}
            InputLabelProps={{
              sx: {
                textTransform: 'capitalize'
              }
            }}
            label={selectProps?.label}
            required={isRequired}
            error={Boolean(error)}
          />
        )}
        value={value}
        onChange={(event, va) => {
          // Call the provided onChangeCallback, if any, on select input change.
          onChange(va)
          !!onChangeCallback && onChangeCallback(va)
        }}
        disabled={selectProps?.disabled}
      />
    </FormControlBase>
  )
}

// -------------------------
// PasswordInput Component
// -------------------------

// A custom password input component with an eye icon to toggle visibility.
export const PasswordInput = ({
  controllerProps,
  inputProps,
  showPassword,
  toggleShowPassword,
  ...props
}: PasswordInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  // Render the password input wrapped in the FormControlBase for styling and error display.
  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <InputLabel sx={{ display: 'flex' }}>
        {inputProps?.label}{' '}
        {props?.isRequired && (
          <Typography ml={0.5} color='error'>
            *
          </Typography>
        )}
      </InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              component='button'
              edge='end'
              onMouseDown={(e: { preventDefault: () => void }) => e.preventDefault()}
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOutline /> : <EyeOffOutline />}
            </IconButton>
          </InputAdornment>
        }
        {...inputProps}
      />
    </FormControlBase>
  )
}

// -------------------------
// CalendarInput Component
// -------------------------

// A custom date picker input component that integrates with 'react-hook-form'.
export const CalendarInput = ({
  controllerProps,
  label,
  minDate,
  disabled,
  datePickerProps,
  isRequired
}: CalendarInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  // Local state to manage the date picker open and anchor element for Popper.
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl]: any = useState(null)

  // Handle date picker Popper open and close.
  const handleClick = (event: MouseEvent) => {
    setOpen(true)
    setAnchorEl(event?.currentTarget)
    if (open) {
      event.stopPropagation()
    }
  }

  // Render the date picker input wrapped in the FormControlBase for styling and error display.
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs as any}>
      <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
        <DatePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={label}
          inputFormat={'MM-DD-YYYY'}
          views={['year', 'month', 'day']}
          value={value}
          maxDate={dayjs()}
          onChange={(input: any) => {
            const convertDate = input ? dayjs(input)?.format('MM-DD-YYYY') : null
            if (convertDate) {
              onChange(convertDate)
            } else {
              onChange(null)
            }
          }}
          PopperProps={{
            placement: 'bottom',
            anchorEl: anchorEl
          }}
          renderInput={({ inputProps, ...restParams }) => (
            <TextField
              {...restParams}
              inputProps={{
                ...inputProps,
                placeholder: 'MM-DD-YYYY'
              }}
              error={Boolean(error)}
              required={isRequired}
              onClick={(event: any) => (!disabled ? handleClick(event) : null)}
              inputRef={inputRef => (!open ? inputRef?.blur() : false)}
              focused={open}
            />
          )}
          disabled={disabled}
          {...datePickerProps}
        />
      </FormControlBase>
    </LocalizationProvider>
  )
}

// -------------------------
// SwitchInput Component
// -------------------------

// A custom switch input component that integrates with 'react-hook-form'.
export const SwitchInput = ({
  controllerProps,
  switchProps,
  label,
  onChangeCallback,
  checkedValue,
  unCheckedValue,
  checkedLabel,
  unCheckedLabel,
  defaultValue
}: SwitchInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  // Set the default value if the provided value is empty.
  useEffect(() => {
    if (!value) {
      defaultValue && onChange(defaultValue)
    }
  }, [value])

  // Render the switch input wrapped in the FormControlBase for styling and error display.
  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <SwitchInputBase
        onChangeCallback={e => {
          // Call the provided onChangeCallback, if any, on switch change.
          onChange(e.target.checked ? checkedValue ?? true : unCheckedValue ?? false)
          !!onChangeCallback && onChangeCallback(e)
        }}
        label={label}
        checked={checkedValue == value}
        checkedLabel={checkedLabel}
        unCheckedLabel={unCheckedLabel}
        switchProps={{ value: value, ...switchProps }}
      />
    </FormControlBase>
  )
}

// -------------------------
// SwitchInputBase Component
// -------------------------

// A base component for rendering a custom switch input with labels.
export const SwitchInputBase = ({
  switchProps,
  formControlLabelProps,
  label,
  checked,
  checkedLabel,
  unCheckedLabel,
  onChangeCallback
}: Omit<SwitchInputType, 'controllerProps'>) => {
  const [isChecked, setIsChecked] = useState(checked || false)
  const [currentlabel, setLabel] = useState(checked ? checkedLabel || label : unCheckedLabel || label)

  // Update the local state when the checked prop changes.
  useEffect(() => {
    if (checked != isChecked) {
      setIsChecked(checked || false)
      setLabel(checked ? checkedLabel || label : unCheckedLabel || label)
    }
  }, [checked, isChecked])

  // Render the switch input wrapped in the FormControlLabel for styling and label display.
  return (
    <FormControlLabel
      control={
        <Switch
          {...switchProps}
          checked={isChecked}
          onChange={e => {
            setIsChecked(e.target.checked)
            !!onChangeCallback && onChangeCallback(e)
            // Update the label based on the switch state.
            e.target.checked
              ? checkedLabel
                ? setLabel(checkedLabel)
                : setLabel(label)
              : unCheckedLabel
              ? setLabel(unCheckedLabel)
              : setLabel(label)
          }}
        />
      }
      label={currentlabel}
      sx={{
        '.MuiFormControlLabel-label': {
          textAlign: 'center',
          width: '50px',
          whiteSpace: 'nowrap',
          textTransform: 'capitalize'
        },
        '.MuiFormControl-root': {
          whiteSpace: 'nowrap'
        },
        '.MuiFormControl-fullWidth': {
          whiteSpace: 'nowrap'
        },
        marginX: '0px !important',
        width: 'min-content'
      }}
      {...formControlLabelProps}
    />
  )
}
