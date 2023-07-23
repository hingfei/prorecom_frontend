import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { perfectScrollbarRef } from 'src/@core/utils/perfect-scrollbar';

// ** DrawerState Type
type DrawerState = {
  isOpen: boolean;
  type: string;
  content?: any;
};

// ** Initial State
const initialState: DrawerState = {
  isOpen: false,
  type: '',
  content: ''
};

// ** Drawer Slice
export const drawerSlice = createSlice({
  name: 'drawerState',
  initialState,
  reducers: {
    // Reducer to set the drawer state
    setDrawerState: (_state: DrawerState, action: PayloadAction<DrawerState>) => {
      return action.payload;
    },
    // Reducer to close the drawer state
    closeDrawerState: (state: DrawerState) => {
      if (perfectScrollbarRef?.current) {
        perfectScrollbarRef.current.scrollTop = 0;
      }

      return { ...state, isOpen: false };
    },
    // Reducer to reset the drawer state to the initial state
    resetDrawerState: () => {
      return initialState;
    }
  }
});

// ** Actions
export const { setDrawerState, closeDrawerState, resetDrawerState } = drawerSlice.actions;

// ** Reducer
export default drawerSlice.reducer;
