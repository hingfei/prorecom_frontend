// ** React Redux Imports
import { batch as reduxBatch, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// ** Type Imports
import type { AppDispatch, RootState } from './index'

// ** Custom useDispatch Hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

// ** Custom useSelector Hook with TypedUseSelectorHook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// ** Expose the batch function from react-redux
export const batch = reduxBatch
