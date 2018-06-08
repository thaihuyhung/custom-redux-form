import { Reducer } from 'redux';
import { FormAction } from './action';
import { INIT_FORM, UPDATE_VALUE, ADD_ERROR_FIELD, REMOVE_ERROR_FIELD, SUBMIT_FORM, REMOVE_FORM } from './constant';

export interface FormState {
  name: string;
  submitted: boolean;
  // tslint:disable-next-line:no-any
  values: any;
  // tslint:disable-next-line:no-any
  errors: any;
}

export interface AllFormState {
  [key: string]: FormState;
}

const initialState: AllFormState = {
};

const formReducer: Reducer<AllFormState> = (state: AllFormState = initialState, action: FormAction): AllFormState => {
  switch (action.type) {
    case INIT_FORM: 
      return {
        ...state,
        [action.data]: {
          name: action.data,
          submitted: false,
          values: null,
          errors: null
        }
      };
    case SUBMIT_FORM:
      return {
        ...state,
        [action.data]: {
          ...state[action.data],
          submitted: true
        }
      }; 
    case REMOVE_FORM: {
      delete state[action.data];
      return state;
    }
    case UPDATE_VALUE: {
      const values = state[action.data.form] ? state[action.data.form].values : null;
      return {
        ...state, 
        [action.data.form]: {
          ...state[action.data.form],
          values: {
            ...values,
            [action.data.field]: action.data.value
          }
        }
      };
    }
    case ADD_ERROR_FIELD:
      return {
        ...state, 
        [action.data.form]: {
          ...state[action.data.form],
          errors: {
            ...state[action.data.form].errors,
            [action.data.field]: action.data.value
          }
        }
      };
    case REMOVE_ERROR_FIELD:
      delete state[action.data.form].errors[action.data.field];
      return state;
    default:
      return state;
  }
};

export default formReducer;
