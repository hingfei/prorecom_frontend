import { Skeleton } from '@mui/material'

// Dropdown Skeleton Component
// This component displays the skeleton for the dropdown menu when loading
const DropdownSkeleton = () => {
  return <Skeleton variant='rectangular' width={'100%'} height={50} sx={{ borderRadius: '10px' }} />
}

export default DropdownSkeleton
