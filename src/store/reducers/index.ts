import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';

const allReducers = {
  drawer: drawerReducer
};

const combinedReducers = combineReducers(allReducers);

const rootReducer = (state: Parameters<typeof combinedReducers>[0], action: Parameters<typeof combinedReducers>[1]) => {
  return combinedReducers(action.type === 'resetStore' ? undefined : state, action);
};

export default rootReducer;
