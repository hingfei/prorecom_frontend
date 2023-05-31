import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode } from 'react';

export type DataGridType = DataGridProps & {
  listingTitle: string;
  headerComponent?: ReactNode;
  visible?: boolean;
};
