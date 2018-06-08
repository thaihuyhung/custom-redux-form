import * as React from 'react';
import TextField, { TextFieldProps } from '../TextField';
import * as classNames from 'classnames';
import * as formAction from '../Form/action';
import { AllFormState } from '../Form/reducer';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import withForm from './withForm';
import './style.css';
import { ValidationRule, ValidationRuleFull, getRuleData, validate } from './utils';

export interface FormControlProps extends TextFieldProps, formAction.FormDispatchProps {
  formName?: string;
  name: string;
  // tslint:disable-next-line:no-any
  defaultValue?: any;
  rules: ValidationRule;
  errorMessage?: string;
  onValid?: () => void;
  onError?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, name?: string) => void;
  /**
   * I wanted to declare specific type for children but it doesn't work 
   * https://github.com/Microsoft/TypeScript/issues/13618
   */
  children: JSX.Element;
  // StateProps
  allFormState?: AllFormState;
}

interface FormControlState {
  valid: boolean;
  touched: boolean;
  dirty: boolean;
  errorMessage: string;
}

class FormControl extends React.Component<FormControlProps, FormControlState> {
  ruleData: ValidationRuleFull;
  constructor(props: FormControlProps) {
    super(props);
    const { name, formName = '', rules, defaultValue, updateValue, removeErrorField, addErrorField } = props; 
    this.ruleData = getRuleData(rules);
    const { valid, errorMessage } = this.getCurrentStatus(defaultValue || '');

    if (updateValue) {
      updateValue({
        form: formName,
        field: name,
        value: defaultValue
      });
    }
    if (valid && removeErrorField) {
      removeErrorField({
        form: formName,
        field: name,
        value: errorMessage
      });
    } else if (!valid && addErrorField) {
      addErrorField({
        form: formName,
        field: name,
        value: errorMessage
      });
    }

    this.state = {
      valid: valid,
      touched: false,
      dirty: false,
      errorMessage: errorMessage
    };
  }

  getCurrentStatus = (inputValue: string) => {
    const validationObject = validate(this.ruleData, inputValue);
    const errorObject = Object.values(validationObject).find(rule => !rule.valid);
    const valid = !errorObject;
    const errorMessage = errorObject ? errorObject.errorMessage : '';
    return {
      valid,
      errorMessage
    };
  }

  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { valid, errorMessage } = this.getCurrentStatus(event.target.value);
    this.setState({ touched: true, valid, errorMessage });
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { formName = '', name, updateValue, addErrorField, removeErrorField } = this.props;
    const { dirty } = this.state;

    const isDirty = dirty ? true : event.target.value.length > 0;
    
    const { valid, errorMessage } = this.getCurrentStatus(event.target.value);
    this.setState({ dirty: isDirty, valid, errorMessage });

    if (updateValue) {
      updateValue({
        form: formName,
        field: name,
        value: event.target.value
      });
    }
    if (valid && removeErrorField) {
      removeErrorField({
        form: formName,
        field: name,
        value: errorMessage
      });
    } else if (!valid && addErrorField) {
      addErrorField({
        form: formName,
        field: name,
        value: errorMessage
      });
    }
  }

  render() {
    const { className, children, allFormState, formName = '', name } = this.props;
    if (children.type !== TextField) {
      throw 'children of FormControl must be a TextField';
    }
    const { valid, errorMessage, touched } = this.state;
    const form = allFormState ? allFormState[formName] : null;
    const isSubmitted = form ? form.submitted : false;
    const showError = !valid && (touched || isSubmitted);
    const hintText = showError ? errorMessage : children.props.hint;
    return (
      <div
        className={classNames(
          'form-control',
          className,
          { 'form-control--error': showError },
          { 'form-control--valid': valid && (touched || isSubmitted) }
        )}
      >
        {React.cloneElement(children, {
          ...children.props,
          name: name,
          onChange: this.onChange,
          onBlur: this.onBlur,
          hint: hintText
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AllFormState) => ({
  allFormState: state.form
});

const mapDispatchToProps = (dispatch: Dispatch<formAction.FormAction>): formAction.FormDispatchProps => {
  return {
    updateValue: (data: formAction.FormFieldUpdateModel) => dispatch(formAction.updateValue(data)),
    addErrorField: (data: formAction.FormFieldUpdateModel) => dispatch(formAction.addErrorField(data)),
    removeErrorField: (data: formAction.FormFieldUpdateModel) => dispatch(formAction.removeErrorField(data))
  };
};

export default compose(
  connect<{}, formAction.FormDispatchProps, FormControlProps, {}>(mapStateToProps, mapDispatchToProps),
  withForm)(FormControl);
