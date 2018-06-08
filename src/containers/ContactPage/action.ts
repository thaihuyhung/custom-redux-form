// tslint:disable:no-any
import {
  SEND_ENQUIRY,
  SEND_ENQUIRY_SUCCESS,
  SEND_ENQUIRY_ERROR
} from './constant';
import { Dispatch } from 'react-redux';

// Model
export interface FormFieldUpdateModel {
  form: string;
  field: string;
  // tslint:disable-next-line:no-any
  value: any;
}

// Action Interface
export type ContactPageAction = SendEnquiryAction | SendEnquirySuccessAction | SendEnquiryErrorAction;

export interface SendEnquiryAction {
  type: SEND_ENQUIRY;
  // tslint:disable-next-line:no-any
  data: any;
}

export interface SendEnquirySuccessAction {
  type: SEND_ENQUIRY_SUCCESS;
  // tslint:disable-next-line:no-any
  data: any;
}

export interface SendEnquiryErrorAction {
  type: SEND_ENQUIRY_ERROR;
  // tslint:disable-next-line:no-any
  data: any;
}

// action
export interface ContactPageDispatchProps {
  sendEnquiry?: (data: any) => void;
}

export const sendEnquiry = (data: any) => (dispatch: Dispatch<ContactPageAction>) => {
  dispatch({
    data,
    type: SEND_ENQUIRY,
  });
  // Simulate API Request
  setTimeout(() => {
    dispatch({
      data,
      type: SEND_ENQUIRY_SUCCESS, // SEND_ENQUIRY_ERROR
    });
  },         5000);
};
