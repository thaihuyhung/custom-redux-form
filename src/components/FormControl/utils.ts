// tslint:disable-next-line:max-line-length
const REGEXP_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEXP_NUMBER = /^-?\d*\.?\d*$/;

interface BasicRule<T> {
  value: T;
  errorMessage?: string;
}

export interface ValidationRule {
  required?: boolean | BasicRule<boolean>;
  email?: boolean | BasicRule<boolean>;
  number?: boolean | BasicRule<boolean>;
  pattern?: RegExp | BasicRule<RegExp>;
  minlength?: number | BasicRule<number>;
}

export interface ValidationRuleFull {
  required?: BasicRule<boolean>;
  email?: BasicRule<boolean>;
  number?: BasicRule<boolean>;
  pattern?: BasicRule<RegExp>;
  minlength?: BasicRule<number>;
}

// tslint:disable-next-line:no-any
const getErrorMessage = (key: keyof ValidationRule, ...others: any[]): string => {
  switch (key) {
    case 'required':
      return 'This field is required';
    case 'email':
      return 'Invalid email address';
    case 'number':
      return 'Invalid number';  
    case 'pattern':
      return 'Invalid data format';  
    case 'minlength':
      return `Required minimum ${others && others[0] ? others[0] : ''} characters`;
    default:
      return 'Invalid data';  
  }
};

const getRuleObject = (rules: ValidationRule, key: keyof ValidationRule) => {
  if (typeof rules[key] === 'object') {
    return rules[key];
  }
  return {
    value: rules[key],
    errorMessage: getErrorMessage(key, rules[key])
  };
};

export const getRuleData = (rules: ValidationRule): ValidationRuleFull => {
  return {
    required: getRuleObject(rules, 'required') as BasicRule<boolean>,
    email: getRuleObject(rules, 'email') as BasicRule<boolean>,
    number: getRuleObject(rules, 'number') as BasicRule<boolean>,
    pattern: getRuleObject(rules, 'pattern') as BasicRule<RegExp>,
    minlength: getRuleObject(rules, 'minlength') as BasicRule<number>,
  };
};

export interface ValidationObjectModel {
  [key: string]: {
    valid: boolean;
    errorMessage: string;
  };
}

export const validate = (ruleData: ValidationRuleFull, 
                         inputValue: string | number | boolean): ValidationObjectModel => {
  const { required, email, number: myNumber, pattern, minlength } = ruleData;
  let validationObject = {};
  if (required && required.value) {
    Object.assign(validationObject, {
      required: {
        valid: inputValue.toString().length > 0,
        errorMessage: getErrorMessage('required')
      }
    });
  }
  if (email && email.value) {
    Object.assign(validationObject, {
      email: {
        valid: REGEXP_EMAIL.test(inputValue.toString()),
        errorMessage: getErrorMessage('email')
      }
    });
  }
  if (myNumber && myNumber.value) {
    try {
      const convertedInt = parseInt(inputValue.toString(), 10);
      const convertedFloat = parseFloat(inputValue.toString());
      Object.assign(validationObject, {
        number: {
          valid: !isNaN(convertedInt) && !isNaN(convertedFloat) && REGEXP_NUMBER.test(inputValue.toString()),
          errorMessage: getErrorMessage('email')
        }
      });
    } catch {
      Object.assign(validationObject, {
        number: {
          valid: false,
        errorMessage: getErrorMessage('number')
        }
      });
    }
  }
  if (pattern && pattern.value) {
    Object.assign(validationObject, {
      pattern: {
        valid: pattern.value.test(inputValue.toString()),
        errorMessage: getErrorMessage('pattern')
      }
    });
  }
  if (minlength && minlength.value) {
    Object.assign(validationObject, {
      minlength: {
        valid: inputValue.toString().length > minlength.value,
        errorMessage: getErrorMessage('minlength', minlength.value)
      }
    });
  }
  return validationObject;
};
