import videobackgroundReducer from "./videobackground";
import { combineReducers } from 'redux';

const rootReducers = combineReducers({ videobackground: videobackgroundReducer });
