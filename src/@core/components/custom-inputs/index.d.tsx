import {
  CheckboxProps,
  FormControlLabelProps,
  OutlinedInputProps,
  SelectProps,
  SwitchProps,
  TextFieldProps
} from '@mui/material'
import React, { ChangeEvent } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import { ControllerProps } from 'react-hook-form'

// --------------------------------
// TypeScript Props Type Definition
// ---------------------------------
export type FormControlBaseType = {
  children: JSX.Element | JSX.Element[]
  isInvalid?: boolean
  errorMessage?: string
  isRequired?: boolean
}

export type TextInputType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>
  inputProps?: TextFieldProps
  isNumber?: boolean
  isRequired?: boolean
  isAutofocus?: boolean
  onChangeCallback?: (value: any) => void
}

export type SelectDataType = {
  value?: string | number | boolean
  label?: string
}

type BaseInputType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>
  isRequired?: boolean
}

export type SelectInputType = BaseInputType & {
  selectProps?: SelectProps
  selectData?: SelectDataType[]
  onChangeCallback?: (value: any) => void
}

export type PasswordInputType = BaseInputType & {
  showPassword: boolean
  toggleShowPassword: (value: any) => void
  inputProps?: OutlinedInputProps
}

export type CalendarInputType = BaseInputType & {
  checkboxProps?: CheckboxProps
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  datePickerProps?: ReactDatePickerProps
  disabled?: boolean
  disablePast?: boolean
  ampm?: boolean
  minDateTime?: any
  maxDateTime?: any
  minDate?: any
  isRequired?: boolean
}

export type SwitchInputType = BaseInputType & {
  switchProps?: SwitchProps
  formControlLabelProps?: FormControlLabelProps
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  checked?: boolean
  checkedValue?: any
  unCheckedValue?: any
  checkedLabel?: string
  unCheckedLabel?: string
  defaultValue?: any
}
