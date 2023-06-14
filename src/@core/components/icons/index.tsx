import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import {
  CheckCircleOutline,
  CloseCircleOutline,
  DeleteOutline,
  EyeOutline,
  MinusCircleOutline,
  PlusCircleOutline,
  SquareEditOutline
} from 'mdi-material-ui'

export type IconBaseProps = IconButtonProps & { title?: string; children: React.ReactNode }

const IconBase = ({ title, children, ...props }: IconBaseProps) => {
  return title ? (
    <Tooltip title={title}>
      <IconButton {...props}>{children}</IconButton>
    </Tooltip>
  ) : (
    <IconButton {...props}>{children}</IconButton>
  )
}

export const ViewIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <EyeOutline fontSize='small' />
    </IconBase>
  )
}

export const EditIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <SquareEditOutline fontSize='small' />
    </IconBase>
  )
}

export const DeleteIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <DeleteOutline fontSize='small' />
    </IconBase>
  )
}

export const PlusIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <PlusCircleOutline fontSize={'small'} />
    </IconBase>
  )
}

export const MinusIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <MinusCircleOutline fontSize={'small'} />
    </IconBase>
  )
}

export const CheckIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <CheckCircleOutline fontSize={'small'} />
    </IconBase>
  )
}

export const CloseIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <CloseCircleOutline fontSize={'small'} />
    </IconBase>
  )
}
