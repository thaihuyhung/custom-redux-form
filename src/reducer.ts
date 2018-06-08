import { Action, Reducer, combineReducers } from 'redux';
import formReducer from './components/Form/reducer';
import contactPageReducer from './containers/ContactPage/reducer';

import AppState from './AppState';

const initialState: AppState = {
    root: null,
    form: null,
    contactPage: null
};

const reducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
    return state;
};

export default combineReducers({
    root: reducer,
    form: formReducer,
    contactPage: contactPageReducer
});
