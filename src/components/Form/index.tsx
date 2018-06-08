import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './style.css';
import * as action from './action';
import { AllFormState } from './reducer';
import FormContext from './formContext';
import AppState from '../../AppState';
import LoadingIndicator from '../LoadingIndicator';

export interface FormProps extends action.FormDispatchProps {
  className?: string;
  children?: JSX.Element[] | JSX.Element;
  loading?: boolean;
  name: string;
  // tslint:disable-next-line:no-any
  onSubmit: (data: any) => void;
  // StateProps
  allFormState?: AllFormState;
}

class Form extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);
    const { name, initForm } = props;
    if (initForm) {
      initForm(name);
    }
  }

  componentWillMount() {
    const { name, removeForm } = this.props;
    if (removeForm) {
      removeForm(name);
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { allFormState, name, submitForm, onSubmit } = this.props;
    if (submitForm) {
      submitForm(name);
    }
    if (allFormState && allFormState[name]) {
      const valid = Object.keys(allFormState[name].errors).length === 0;
      if (valid) {
        onSubmit({
          ...allFormState[name],
          submitted: true,
          valid
        });
      }
    }
    event.preventDefault();
  }

  render() {
    const { className, children, name, loading } = this.props;
    return (
      <FormContext.Provider value={name}>
        <form 
          noValidate={true}
          className={classNames(className, 'form', {'form--loading': loading})} 
          onSubmit={this.handleSubmit}
        >
          {

          }
          {children}
          {
            loading && <div className="form__loading-wrapper"><LoadingIndicator /></div>
          }
        </form>
      </FormContext.Provider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  allFormState: state.form
});
const mapDispatchToProps = (dispatch: Dispatch<action.FormAction>) => {
  return {
    initForm: (data: string) => dispatch(action.initForm(data)),
    submitForm: (data: string) => dispatch(action.submitForm(data)),
    removeForm: (data: string) => dispatch(action.removeForm(data)),
  };
};

export default connect<{}, action.FormDispatchProps, FormProps, {}>
  (mapStateToProps, mapDispatchToProps)(Form);
