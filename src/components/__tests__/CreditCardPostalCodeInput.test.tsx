import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CreditCardPostalCodeInput } from '../CreditCardPostalCodeInput';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

describe('CreditCardPostalCodeInput', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <CreditCardPostalCodeInput />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-postal-code`)).to.be.length(1);
    });

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardPostalCodeInput />);
      expect(wrapper.find('.sq-label')).to.be.length(1);
    });
  });

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardPostalCodeInput />);
      expect(wrapper.find('.sq-label').text()).to.eql('Postal');
    });

    it('should render a custom placeholder label', () => {
      const label = 'test';
      const wrapper = mount(<CreditCardPostalCodeInput label={label} />);
      expect(wrapper.find('.sq-label').text()).to.eql(label);
    });

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardPostalCodeInput label={''} />);
      expect(wrapper.find('.sq-label')).to.be.length(0);
    });
  });
});
