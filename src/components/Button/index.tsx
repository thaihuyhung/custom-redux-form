import * as React from 'react';
import './style.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: React.SFC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <button className="button">{children}</button>
  );
};

export default Button;