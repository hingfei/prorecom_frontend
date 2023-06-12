import {
  Autocomplete,
  Checkbox,
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
import { CalendarOutline, EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useController } from 'react-hook-form'
import {
  CalendarInputType,
  CheckboxInputType,
  FormControlBaseType,
  PasswordInputType,
  SelectInputType,
  SwitchInputType, TextInputIconType,
  TextInputType
} from './index.d'
import { useEffect, useRef, useState } from 'react'
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from 'react-datepicker';
// import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider, TimePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { useDropzone } from 'react-dropzone';
// import toast from 'react-hot-toast';
// import dayjs from 'dayjs';

export const FormControlBase = ({ children, isInvalid, errorMessage, isRequired }: FormControlBaseType) => {
  return (
    <FormControl fullWidth required={isRequired}>
      {children}
      {isInvalid && <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

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

  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <TextField
        required={Boolean(isRequired)}
        autoFocus={Boolean(isAutofocus)}
        value={value ? value : ''}
        onChange={event => {
          if (isNumber && !!event?.target?.value) {
            onChange(Number(event?.target?.value))
          } else {
            onChange(event)
          }
          !!onChangeCallback && onChangeCallback(event)
        }}
        error={Boolean(error)}
        {...inputProps}
        InputProps={{ endAdornment, startAdornment, inputProps: { min: '0' } }}
      />
    </FormControlBase>
  )
}

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

  // Note: autocomplete value must be in object format
  useEffect(() => {
    if (typeof value !== 'object' && value) {
      onChange(selectData?.find(item => item.value === value))
    }
  }, [typeof value !== 'object', JSON.stringify(selectData)])

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
          onChange(va)
          !!onChangeCallback && onChangeCallback(va)
        }}
        disabled={selectProps?.disabled}
      />
    </FormControlBase>
  )
}

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

export const CheckboxInput = ({ controllerProps, checkboxProps, label, onChangeCallback }: CheckboxInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  })

  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <FormControlLabel
        control={
          <Checkbox
            value={value}
            checked={value}
            onChange={e => {
              onChange(e.target.checked)
              !!onChangeCallback && onChangeCallback(e)
            }}
            {...checkboxProps}
          />
        }
        label={label}
      />
    </FormControlBase>
  )
}

export const CalendarInput = ({ controllerProps, label, minDate, disabled, datePickerProps, isRequired }: CalendarInputType) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    ...controllerProps
  });

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl]: any = useState(null);

  const handleClick = (event: MouseEvent) => {
    setOpen(true);
    setAnchorEl(event?.currentTarget);
    if (open) {
      event.stopPropagation();
    }
  };

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
            const convertDate = input ? dayjs(input)?.format('MM-DD-YYYY') : null;
            if (convertDate) {
              onChange(convertDate);
            } else {
              onChange(null);
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
  );
};

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

  useEffect(() => {
    if (!value) {
      defaultValue && onChange(defaultValue)
    }
  }, [value])

  return (
    <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
      <SwitchInputBase
        onChangeCallback={e => {
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

  useEffect(() => {
    if (checked != isChecked) {
      setIsChecked(checked || false)
      setLabel(checked ? checkedLabel || label : unCheckedLabel || label)
    }
  }, [checked, isChecked])

  return (
    <FormControlLabel
      control={
        <Switch
          {...switchProps}
          checked={isChecked}
          onChange={e => {
            setIsChecked(e.target.checked)
            !!onChangeCallback && onChangeCallback(e)
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

// export const TimeInput = ({ controllerProps, label, defaultValue }: TimeInputType) => {
//   const {
//     field: { onChange, value },
//     fieldState: { error }
//   } = useController({
//     ...controllerProps
//   });
//
//   const [open, setOpen] = useState<boolean>(false);
//   const [pickerError, setPickerError] = useState<string | ''>('');
//
//   useEffect(() => {
//     setPickerError('');
//     if (!value) {
//       onChange(defaultValue);
//     }
//   }, []);
//
//   const time = value?.split(':');
//
//   return (
//     <FormControlBase isInvalid={Boolean(error || pickerError)} errorMessage={error?.message || pickerError}>
//       {/* @ts-ignore */}
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <TimePicker
//           onError={reason => {
//             if (!!reason) {
//               setPickerError(`Invalid Time`);
//               onChange(null);
//             }
//           }}
//           onClose={() => setOpen(false)}
//           open={open}
//           label={label || ''}
//           value={time && time?.[0] && time?.[1] ? new Date(2022, 1, 1, time[0], time[1], 0, 0) : null}
//           onChange={newValue => {
//             if (newValue != null) {
//               const hour = (newValue?.getHours() || 0) < 10 ? '0' + newValue?.getHours() : newValue?.getHours();
//               const minutes =
//                 (newValue?.getMinutes() || 0) < 10 ? '0' + newValue?.getMinutes() : newValue?.getMinutes();
//               onChange(`${hour}:${minutes}`);
//               setPickerError(``);
//             }
//           }}
//           renderInput={params => (
//             <TextField
//               onClick={() => setOpen(true)}
//               onChange={value => {
//                 if (!value.target.value) {
//                   onChange(null);
//                 }
//                 if (!/^(1[0-2]|0?[1-9]):[0-5]*[0-9] (AM|PM)$/i.test(value.target.value)) {
//                   setPickerError(`Invalid Time`);
//                   onChange(null);
//                 }
//               }}
//               {...params}
//               error={Boolean(error || pickerError)}
//               sx={{ '.MuiOutlinedInput-input': { paddingY: '12px!important' } }}
//             />
//           )}
//         />
//       </LocalizationProvider>
//     </FormControlBase>
//   );
// };

// export const PlacesAutoCompleteInput = ({
//                                           controllerProps,
//                                           isRequired,
//                                           label,
//                                           setSelected,
//                                           isGoogleApiLoaded,
//                                           ...props
//                                         }: PlaceAutoCompleteInputProps) => {
//   const {
//     field: { onChange, value },
//     fieldState: { error }
//   } = useController({
//     ...controllerProps
//   });
//
//   return (
//     <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message} isRequired={Boolean(isRequired)}>
//       <PlacesAutoComplete
//         label={label}
//         setSelected={setSelected}
//         address={value}
//         onInputChange={onChange}
//         isRequired={Boolean(isRequired)}
//         isGoogleApiLoaded={isGoogleApiLoaded}
//         error={Boolean(error)}
//         {...props}
//       />
//     </FormControlBase>
//   );
// };

// export const ImageInput = ({ controllerProps, previewHeight, imageStyle, buttonStyle }: ImageInputType) => {
//   const {
//     field: { onChange, value },
//     fieldState: { error }
//   } = useController({
//     ...controllerProps
//   });
//
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'image/*': ['.png', '.jpg', '.jpeg', '.gif']
//     },
//     onDrop: (uploadFiles: File[]) => {
//       onChange(uploadFiles[0]);
//     },
//     onDropRejected: () => {
//       toast.error('Something went wrong', {
//         duration: 2000
//       });
//     }
//   });
//
//   const preview_image = (value: any) => {
//     if (typeof value === 'string' && value != '') {
//       return value;
//     } else if (value instanceof File) {
//       return URL.createObjectURL(value);
//     }
//   };
//
//   const Img = styled('img')(({ theme }) => ({
//     [theme.breakpoints.up('xs')]: {
//       marginRight: '18px'
//     }
//   }));
//
//   return (
//     <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
//       <Button
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'row',
//           border: '2px dashed rgba(93, 89, 98, 0.22);',
//           marginBottom: 3,
//           paddingX: 5,
//           ...buttonStyle,
//           height: !!previewHeight ? previewHeight : '120px',
//           textTransform: 'unset'
//         }}
//         {...getRootProps({ className: 'dropzone' })}
//       >
//         <input {...getInputProps()} value={undefined} />
//
//         {value ? (
//           <Box position={'relative'} height="100%" width="100%">
//             <IconButton
//               onClick={e => {
//                 e.stopPropagation();
//                 onChange(null);
//               }}
//               sx={{ position: 'absolute', right: 0, top: 0 }}
//             >
//               <Close fontSize='medium' />
//             </IconButton>
//
//             <img
//               src={preview_image(value)}
//               alt={`add_image`}
//               width={'auto'}
//               height={'100%'}
//               style={{ objectFit: 'contain', ...imageStyle }}
//             />
//           </Box>
//         ) : (
//           <>
//             <Img height={28} alt='image' src='/images/misc/image_icon.png' />
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 textAlign: ['start']
//               }}
//             >
//               <Typography variant='body2' fontWeight={600}>
//                 Upload Image
//               </Typography>
//               <Typography variant={'body1'}>Allowed JPG or PNG.</Typography>
//               <Typography variant={'body1'}>Max size of 800K</Typography>
//             </Box>
//           </>
//         )}
//       </Button>
//     </FormControlBase>
//   );
// };

// export const DateTimeInput = ({
//                                 isRequired,
//                                 controllerProps,
//                                 label,
//                                 disabled,
//                                 disablePast,
//                                 ampm,
//                                 minDateTime,
//                                 maxDateTime,
//                                 dateTimePickerProps
//                               }: CalendarInputType & { dateTimePickerProps?: Partial<DateTimePickerProps> }) => {
//   const {
//     field: { onChange, value },
//     fieldState: { error }
//   } = useController({
//     ...controllerProps
//   });
//
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl]: any = useState(null);
//
//   const handleClick = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
//     setOpen(true);
//     setAnchorEl(event?.currentTarget);
//     if (open) {
//       event.stopPropagation();
//     }
//   };
//
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs as any}>
//       <FormControlBase isInvalid={Boolean(error)} errorMessage={error?.message}>
//         <DateTimePicker
//           open={open}
//           onOpen={() => setOpen(true)}
//           onClose={() => setOpen(false)}
//           renderInput={({ inputProps, ...restParams }) => (
//             <TextField
//               {...restParams}
//               inputProps={{
//                 ...inputProps,
//                 placeholder: 'DD-MM-YYYY hh:mm'
//               }}
//               error={Boolean(error)}
//               required={isRequired}
//               onClick={(event: any) => (!disabled ? handleClick(event) : null)}
//               inputRef={inputRef => (!open ? inputRef?.blur() : false)}
//               focused={open}
//             />
//           )}
//           PopperProps={{
//             placement: 'bottom',
//             anchorEl: anchorEl
//           }}
//           label={label}
//           inputFormat={'DD-MM-YYYY hh:mma'}
//           views={['year', 'month', 'day', 'hours', 'minutes']}
//           value={value}
//           ampm={ampm}
//           minDate={dayjs('2022-01-01')}
//           minDateTime={minDateTime}
//           maxDateTime={maxDateTime}
//           disablePast={disablePast}
//           onChange={(dateTimeInput: any) => {
//             const convertDate = dateTimeInput ? dayjs(dateTimeInput)?.format('YYYY-MM-DD HH:mm:00') : null;
//             if (convertDate) {
//               onChange(convertDate);
//             } else {
//               onChange(null);
//             }
//           }}
//           disabled={disabled}
//           {...dateTimePickerProps}
//         />
//       </FormControlBase>
//     </LocalizationProvider>
//   );
// };
