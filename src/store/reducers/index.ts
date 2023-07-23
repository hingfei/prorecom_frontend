import { combineReducers } from 'redux'
import drawerReducer from './drawerReducer'

// ** All Reducers Object
const allReducers = {
  drawer: drawerReducer
}

// ** Combined Reducers
const combinedReducers = combineReducers(allReducers)

// ** Root Reducer
const rootReducer = (state: Parameters<typeof combinedReducers>[0], action: Parameters<typeof combinedReducers>[1]) => {
  return combinedReducers(action.type === 'resetStore' ? undefined : state, action)
}

export default rootReducer
