import { Skeleton } from '@mui/material';

const DropdownSkeleton = () => {
  return <Skeleton variant='rectangular' width={'100%'} height={50} sx={{ borderRadius: '10px' }} />;
};

export default DropdownSkeleton;
