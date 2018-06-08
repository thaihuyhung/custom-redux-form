import * as React from 'react';
import FormContext from '../Form/formContext';
import { FormControlProps } from './index';

// tslint:disable-next-line:no-any
export default function withForm(Comp: any) {
  return function wrappedFormControl(props: FormControlProps) {
    return (
      <FormContext.Consumer>
        {(value: string) => <Comp {...props} formName={value} />}
      </FormContext.Consumer>
    );
  };
}