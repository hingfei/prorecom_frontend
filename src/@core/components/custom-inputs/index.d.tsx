import {
  CheckboxProps,
  OutlinedInputProps,
  SwitchProps,
  SelectProps,
  TextFieldProps,
  FormControlLabelProps
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import { ControllerProps } from 'react-hook-form';

export type FormControlBaseType = {
  children: JSX.Element | JSX.Element[];
  isInvalid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
};

export type TextInputType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>;
  inputProps?: TextFieldProps;
  isNumber?: boolean;
  isRequired?: boolean;
  onChangeCallback?: (value: any) => void;
};

export type TextInputIconType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>;
  inputProps?: TextFieldProps;
  isNumber?: boolean;
  isRequired?: boolean;
  onChangeCallback?: (value: any) => void;
  onClick: (value: any) => void;
};

export type SelectDataType = {
  value?: string | number;
  label?: string;
};

export type CheckboxDataType = {
  value: string;
  label: string;
};

export type GroupCheckboxDataType = {
  id: string;
  name: string;
};

type BaseInputType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>;
  isRequired?: boolean;
};

export type SelectInputType = BaseInputType & {
  selectProps?: SelectProps;
  selectData?: SelectDataType[];
  onChangeCallback?: (value: any) => void;
};


export type PasswordInputType = BaseInputType & {
  showPassword: boolean;
  toggleShowPassword: (value: any) => void;
  inputProps?: OutlinedInputProps;
};

export type CheckboxInputType = BaseInputType & {
  checkboxProps?: CheckboxProps;
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export type CalendarInputType = BaseInputType & {
  checkboxProps?: CheckboxProps;
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  datePickerProps?: ReactDatePickerProps;
  disabled?: boolean;
  disablePast?: boolean;
  ampm?: boolean;
  minDateTime?: any;
  maxDateTime?: any;
  minDate?: any;
  isRequired?: boolean;
};


export type SwitchInputType = BaseInputType & {
  switchProps?: SwitchProps;
  formControlLabelProps?: FormControlLabelProps;
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked?: boolean;
  checkedValue?: any;
  unCheckedValue?: any;
  checkedLabel?: string;
  unCheckedLabel?: string;
  defaultValue?: any;
};

export type TimeInputType = BaseInputType & {
  checkboxProps?: CheckboxProps;
  onChangeCallback?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  defaultValue?: string; // Format HH:MM
};

export type ImageInputType = {
  controllerProps: Omit<ControllerProps<any, any>, 'render'>;
  previewHeight?: string;
  buttonStyle?:  React.CSSProperties,
  imageStyle? : React.CSSProperties
};
