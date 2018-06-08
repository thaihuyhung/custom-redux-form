// tslint:disable:no-any
import * as React from 'react';
export const flattenChildren = (children: React.ReactNode, type: any) => {
  const flattenDeep = (array: any): any => {
    return React.Children.toArray(array).reduce((acc: any, child: JSX.Element) => {
      if (!child.type) {
        return acc;
      } else if (child.type !== type && child.props && child.props.children) {
        return acc.concat(flattenDeep(child.props.children));
      }
      return acc.concat(child);
    },                                          []);
  };
  return flattenDeep(children);
};

export const recursiveMapChildren = 
  (children: React.ReactNode, callback: any): React.ReactNode => React.Children
  .map(children, (child: any): any[] | any => 
    child.props && child.props.children ? 
      callback(child, recursiveMapChildren(child.props.children, callback)) : 
      child
);