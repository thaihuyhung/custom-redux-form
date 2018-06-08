import {
  UPDATE_VALUE,
  ADD_ERROR_FIELD,
  REMOVE_ERROR_FIELD,
  INIT_FORM,
  SUBMIT_FORM,
  REMOVE_FORM
} from './constant';

// Model
export interface FormFieldUpdateModel {
  form: string;
  field: string;
  // tslint:disable-next-line:no-any
  value: any;
}

// Action Interface
export type FormAction = UpdateValueAction | AddErrorFieldAction | RemoveErrorFieldAction | 
  InitFormAction | SubmitFormAction | RemoveFormAction;

export interface UpdateValueAction {
  type: UPDATE_VALUE;
  data: FormFieldUpdateModel;
}

export interface AddErrorFieldAction {
  type: ADD_ERROR_FIELD;
  data: FormFieldUpdateModel;
}

export interface RemoveErrorFieldAction {
  type: REMOVE_ERROR_FIELD;
  data: FormFieldUpdateModel;
}

export interface InitFormAction {
  type: INIT_FORM;
  data: string;
}

export interface SubmitFormAction {
  type: SUBMIT_FORM;
  data: string;
}

export interface RemoveFormAction {
  type: REMOVE_FORM;
  data: string;
}

// action
export interface FormDispatchProps {
  updateValue?: (data: FormFieldUpdateModel) => UpdateValueAction;
  addErrorField?: (data: FormFieldUpdateModel) => AddErrorFieldAction;
  removeErrorField?: (data: FormFieldUpdateModel) => RemoveErrorFieldAction;
  initForm?: (data: string) => InitFormAction;
  submitForm?: (data: string) => SubmitFormAction;
  removeForm?: (data: string) => RemoveFormAction;
}

export function updateValue(data: FormFieldUpdateModel): UpdateValueAction {
  return {
    data,
    type: UPDATE_VALUE,
  };
}

export function addErrorField(data: FormFieldUpdateModel): AddErrorFieldAction {
  return {
    data,
    type: ADD_ERROR_FIELD,
  };
}

export function removeErrorField(data: FormFieldUpdateModel): RemoveErrorFieldAction {
  return {
    data,
    type: REMOVE_ERROR_FIELD,
  };
}

export function initForm(data: string): InitFormAction {
  return {
    data,
    type: INIT_FORM
  };
}

export function submitForm(data: string): SubmitFormAction {
  return {
    data,
    type: SUBMIT_FORM
  };
}

export function removeForm(data: string): RemoveFormAction {
  return {
    data,
    type: REMOVE_FORM
  };
}
