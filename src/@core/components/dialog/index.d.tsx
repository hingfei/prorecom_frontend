import { ReactNode } from 'react';
import { DialogActionsProps, DialogContentProps, DialogTitleProps, DialogProps } from '@mui/material';

export type DialogPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (e?:any) => void;
  onCancel?: () => void;
  dialogTitle? : string;
  children?: ReactNode;
  disabled?: boolean;
  buttonTitle?: string;
};

export type DialogLayoutBasePropsType = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  closeLabel?: string;
  dialogTitle?: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  children?: ReactNode;
  action?: ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  dialogTitleProps?: DialogTitleProps;
  dialogContentProps?: DialogContentProps;
  dialogActionsProps?: DialogActionsProps;
  disabled?: boolean;
  showActions?: boolean;
  cancelButtonOnly?: boolean;
};
