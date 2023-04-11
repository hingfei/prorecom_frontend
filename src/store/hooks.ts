import { TypedUseSelectorHook, useDispatch, useSelector, batch as reduxBatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const batch = reduxBatch;
