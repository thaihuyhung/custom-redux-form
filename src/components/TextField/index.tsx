import * as React from 'react';
import * as classNames from 'classnames';
import './style.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  multiple?: boolean;
  cols?: number;
  rows?: number;
  dirName?: string;
  wrap?: string;
  hint?: string;
}

class TextField extends React.Component<TextFieldProps, {}> {
  static defautlProps: Partial<TextFieldProps> = {
    type: 'text'
  };

  render() {
    const { type, label, multiple, hint, className, name, ...restProps } = this.props;
    return (
      <div className={classNames('text-field', className)}>
        <label className="text-field__label">
          {label}
        </label>
        <div className="text-field__input-wrapper">
        {
          multiple ? 
          <textarea 
            className="text-field__input" 
            name={name}
            {...restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          />
          : <input className="text-field__input" type={type} name={name} {...restProps} />
        }
        <div className="text-field__hint-wrapper">
          {(hint && <div className="text-field__hint">{hint}</div>)}
        </div> 
        </div>
      </div>
    );
  }
}

export default TextField;