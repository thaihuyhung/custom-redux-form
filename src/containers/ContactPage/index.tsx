import * as React from 'react';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import * as action from './action';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppState from '../../AppState';
import * as JSONPretty from 'react-json-pretty';
import './style.css';

export interface ContactPageProps extends action.ContactPageDispatchProps {
  // StateProps
  loading?: boolean;
  // tslint:disable-next-line:no-any
  data?: any;
}

export class ContactPage extends React.Component<ContactPageProps, {}> {

  // tslint:disable-next-line:no-any
  onSubmit = (event: any) => {
    const { sendEnquiry } = this.props;
    if (sendEnquiry) {
      sendEnquiry(event);
    }
  }

  render() {
    const fullNameRules = {
      required: true
    };
    const emailRules = {
      email: {
        value: true,
        errorMessage: 'Invalid email address'
      }
    };
    const messageRules = {
      minlength: 10
    };
    const { loading, data } = this.props;
    return (
      <div className="contact-page">
        <Form 
          className="contact-page__jimbo-form" 
          name="jimboForm"
          onSubmit={this.onSubmit} 
          loading={loading}
        >
          <FormControl name="fullName" rules={fullNameRules}>
            <TextField label="Full Name" />
          </FormControl>
          <FormControl name="email" rules={emailRules}>
            <TextField type="email" label="Email" />
          </FormControl>
          <FormControl name="message" rules={messageRules}>
            <TextField label="Message" multiple={true} rows={3} />
          </FormControl>
          <section>
            <Button>Submit</Button>
          </section>
        </Form>
        <div className="response">
          Response:
          <JSONPretty json={data ? data.values : {}} />
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line:no-any
const mapStateToProps = (state: AppState) => ({
  loading: state.contactPage && state.contactPage.loading,
  data: state.contactPage && state.contactPage.data
});

const mapDispatchToProps = (dispatch: Dispatch<action.ContactPageAction>) => {
  return {
    // tslint:disable-next-line:no-any
    sendEnquiry: (data: any) => action.sendEnquiry(data)(dispatch)
  };
};

export default connect<{}, action.ContactPageDispatchProps, ContactPageProps, {}>
  (mapStateToProps, mapDispatchToProps)(ContactPage);