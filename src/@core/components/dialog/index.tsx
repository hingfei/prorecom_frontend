import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Fragment } from 'react'
import { DialogLayoutBasePropsType, DialogPropsType } from './index.d'

export const DialogLayoutBase = ({
  isOpen,
  onClose,
  onSubmit,
  onCancel,
  submitButtonLabel,
  cancelButtonLabel,
  dialogTitle,
  children,
  action,
  dialogProps,
  dialogTitleProps,
  dialogContentProps,
  dialogActionsProps,
  disabled,
  showActions = true,
  cancelButtonOnly = false
}: DialogLayoutBasePropsType) => {
  return (
    <Fragment>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth='sm' {...dialogProps}>
        <DialogTitle sx={{ pb: 0 }} {...dialogTitleProps}>
          <Typography variant='h5' fontWeight={600} sx={{ mb: 3, lineHeight: '2rem' }}>
            {dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }} {...dialogContentProps}>
          {children}
        </DialogContent>
        {showActions && (
          <DialogActions sx={{ justifyContent: 'flex-end', display: 'flex' }} {...dialogActionsProps}>
            {action || (
              <>
                {cancelButtonOnly == false ? (
                  <Button
                    variant='contained'
                    sx={{ mr: 2 }}
                    onClick={() => {
                      onSubmit && onSubmit()
                    }}
                    disabled={disabled}
                  >
                    {submitButtonLabel || 'Save'}
                  </Button>
                ) : null}
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    !!onCancel ? onCancel() : onClose()
                  }}
                >
                  {cancelButtonLabel || 'Cancel'}
                </Button>
              </>
            )}
          </DialogActions>
        )}
      </Dialog>
    </Fragment>
  )
}

export const DialogDeleteLayout = ({
  isOpen,
  onClose,
  onSubmit,
  dialogTitle,
  children,
  dialogContext,
  disabled,
  buttonTitle
}: DialogPropsType & { dialogContext?: string }) => {
  return (
    <DialogLayoutBase
      isOpen={isOpen}
      onClose={onClose}
      dialogTitle={dialogTitle || 'Delete Confimation'}
      onSubmit={onSubmit}
      dialogProps={{ maxWidth: 'sm' }}
      dialogTitleProps={{ sx: { pb: 0 } }}
      dialogActionsProps={{ sx: {} }}
      dialogContentProps={{ sx: { pt: 0, overflowY: 'unset' } }}
      action={
        <>
          <Button color='error' variant='contained' onClick={onSubmit} disabled={disabled}>
            {buttonTitle || 'Delete'}
          </Button>
          <Button onClick={onClose} color='secondary' variant='outlined'>
            Cancel
          </Button>
        </>
      }
    >
      {children || (
        <Typography variant='body2' sx={{ mb: 3, lineHeight: '2rem' }}>
          {dialogContext}
        </Typography>
      )}
    </DialogLayoutBase>
  )
}

export default DialogLayoutBase
