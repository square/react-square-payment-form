import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CreditCardSubmitButton } from '../CreditCardSubmitButton';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

describe('CreditCardPostalCodeInput', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  it('should render the class name for styling', () => {
    const wrapper = mount(
      <Context.Provider value={mockContext}>
        <CreditCardSubmitButton />
      </Context.Provider>
    );
    expect(wrapper.find('.sq-creditcard')).to.be.length(1);
  });

  it('should call onCreateNonce when clicked', () => {
    const wrapper = mount(
      <Context.Provider value={mockContext}>
        <CreditCardSubmitButton />
      </Context.Provider>
    );
    wrapper.find('button').simulate('click');
    expect(mockContext.onCreateNonce.mock.calls.length).to.eql(1);
  });

  describe('children', () => {
    it('should render the default placeholder', () => {
      const wrapper = mount(<CreditCardSubmitButton />);
      expect(wrapper.find('button').text()).to.eql('Pay');
    });

    it('should render a custom placeholder', () => {
      const test = 'Pay $1.00';
      const wrapper = mount(<CreditCardSubmitButton>{test}</CreditCardSubmitButton>);
      expect(wrapper.find('button').text()).to.eql(test);
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      const wrapper = mount(<CreditCardSubmitButton />);
      expect(wrapper.find('button').prop('disabled')).to.eql(false);
    });

    it('can be disabled', () => {
      const wrapper = mount(<CreditCardSubmitButton disabled />);
      expect(wrapper.find('button').prop('disabled')).to.eql(true);
    });
  });
});
