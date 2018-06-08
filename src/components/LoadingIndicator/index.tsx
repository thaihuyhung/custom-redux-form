import * as React from 'react';
import './style.css';

interface LoadingIndicatorProps {
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (props) => {
  return (
    <div className="lds-spinner">
      {Array(12).fill(1).map((item, index) => <div key={index} />)}
    </div>
  );
};

export default LoadingIndicator;