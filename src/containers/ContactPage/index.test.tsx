import * as React from 'react';
import { ContactPage } from './index';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../reducer';

describe('form submitting should work properly', () => {
  const sendEnquiry = jest.fn();

  // tslint:disable-next-line:no-any
  const _createStore = (r: any) => createStore(reducer);
  const store = applyMiddleware(thunk)(_createStore)(reducer);

  const wrapper = mount(
    <Provider store={store}>
      <ContactPage sendEnquiry={sendEnquiry} />
    </Provider>
  );
  const contactPage = wrapper.childAt(0);
  const fullName = contactPage.find('input[name="fullName"]');
  const email = contactPage.find('input[name="email"]');
  const message = contactPage.find('textarea[name="message"]');

  it('input fullName should exist', () => {
    expect(fullName).toHaveLength(1);
  });

  it('input email should exist', () => {
    expect(email).toHaveLength(1);
  });

  it('input message should exist', () => {
    expect(message).toHaveLength(1);
  });

  it('should call sendEnquiry when submit to send data to api', () => {
    const expectedData = {
      fullName: 'Hung Thai',
      email: 'hungth.it@gmail.com',
      message: 'Hello Jimbo, I\'m Hung Thai. Nice to meet you!'
    };
    fullName.simulate('change', { target: { value: expectedData.fullName } });
    email.simulate('change', { target: { value: expectedData.email } });
    message.simulate('change', { target: { value: expectedData.message } });

    const form = contactPage.find('form');
    form.simulate('submit');
    expect(contactPage.prop('sendEnquiry'))
      .toHaveBeenCalledWith(expect.objectContaining({
        values: expectedData
      }));
  });
});
