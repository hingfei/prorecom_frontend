import { Skeleton } from '@mui/material';

const generateSkeletonColumns = (columns: any) => {
  return columns.map((item: any) => {
    return {
      ...item,
      renderCell: () => {
        return <Skeleton width={'50%'} height={30} />;
      }
    };
  });
};

export default generateSkeletonColumns;
