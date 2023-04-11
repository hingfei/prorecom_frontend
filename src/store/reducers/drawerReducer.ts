import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { perfectScrollbarRef } from 'src/@core/utils/perfect-scrollbar';

type DrawerState = {
  isOpen: boolean;
  type: string;
  content?: any;
};

const initialState: DrawerState = {
  isOpen: false,
  type: '',
  content: ''
};

export const drawerSlice = createSlice({
  name: 'drawerState',
  initialState,
  reducers: {
    setDrawerState: (_state: DrawerState, action: PayloadAction<DrawerState>) => {
      return action.payload;
    },
    closeDrawerState: (state: DrawerState) => {
      if (perfectScrollbarRef?.current) {
        perfectScrollbarRef.current.scrollTop = 0;
      }

      return { ...state, isOpen: false };
    },
    resetDrawerState: () => {
      return initialState;
    }
  }
});

export const { setDrawerState, closeDrawerState, resetDrawerState } = drawerSlice.actions;

export default drawerSlice.reducer;
