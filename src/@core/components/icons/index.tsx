import { IconButton, Tooltip } from '@mui/material'
import { DeleteOutline, PencilOutline, MinusCircleOutline, PlusCircleOutline } from 'mdi-material-ui'
import { IconButtonProps } from '@mui/material';

export type IconBaseProps = IconButtonProps & { title?: string; children: React.ReactNode };

const IconBase = ({ title, children, ...props }: IconBaseProps) => {
  return title ? (
    <Tooltip title={title}>
      <IconButton {...props}>{children}</IconButton>
    </Tooltip>
  ) : (
    <IconButton {...props}>{children}</IconButton>
  )
}

export const EditIcon = (props: Omit<IconBaseProps, 'children'>) => {
  return (
    <IconBase {...props}>
      <PencilOutline fontSize='small' />
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
