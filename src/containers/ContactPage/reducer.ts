import { Reducer } from 'redux';
import { ContactPageAction } from './action';
import { SEND_ENQUIRY, SEND_ENQUIRY_SUCCESS, SEND_ENQUIRY_ERROR } from './constant';

export interface ContactPageState {
  // tslint:disable-next-line:no-any
  data: any;
  loading: boolean;
}
const initialState: ContactPageState = {
  data: null,
  loading: false
};

const contactPageReducer: Reducer<ContactPageState> = 
  (state: ContactPageState = initialState, action: ContactPageAction): ContactPageState => {
  switch (action.type) {
    case SEND_ENQUIRY:
      return {
        ...state,
        loading: true
      };
    case SEND_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case SEND_ENQUIRY_ERROR:
      return {
        ...state,
        loading: false,
        data: null
      };
    default:
      return state;
  }
};

export default contactPageReducer;
