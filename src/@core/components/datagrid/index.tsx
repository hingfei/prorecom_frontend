import { Box, Card, Grid, styled, Typography } from '@mui/material';
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';
import { DataGridType } from './index.d';

// ** Styling for the grid overlay when no rows are available
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150
}));

// ** Array of options for the number of rows per page in the data grid
export const ROWS_PER_PAGE = [5, 10, 15]

// ** Custom component for the overlay to display when no rows are available in the data grid
export const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <img
        height={110}
        alt='empty'
        src={'/images/empty-placeholder-light.png'}
      />
      <Box sx={{ py: 1 }}>No Record Found</Box>
    </StyledGridOverlay>
  );
};

// ** DataGrid component to display tabular data with various customization options
const DataGrid = ({ listingTitle, headerComponent, visible = true, ...props }: DataGridType) => {
  return (
    <Grid item xs={12}>
      <Card>
        {listingTitle && (
          <Box
            sx={{
              p: 5,
              pb: 3,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography fontSize={16} fontWeight={600} component='h2'>
              {listingTitle}
            </Typography>
          </Box>
        )}
        {headerComponent ? (
          <Box
            sx={{
              px: 5,
              pb: 5
            }}
          >
            {headerComponent}
          </Box>
        ) : null}
        {visible && (
          <MUIDataGrid
            autoHeight
            disableColumnMenu
            disableColumnFilter
            disableRowSelectionOnClick
            checkboxSelection={false}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            getRowHeight={() => 'auto'}

            // getEstimatedRowHeight={() => 80}
            rowHeight={80}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              NoResultsOverlay: CustomNoRowsOverlay
            }}
            {...props}
          />
        )}
      </Card>
    </Grid>
  );
};

export default DataGrid;
