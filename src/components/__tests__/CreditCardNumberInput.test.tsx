import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CreditCardNumberInput } from '../CreditCardNumberInput';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

describe('CreditCardNumberInput', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <CreditCardNumberInput />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-card-number`)).to.be.length(1);
    });

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardNumberInput />);
      expect(wrapper.find('.sq-label')).to.be.length(1);
    });
  });

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardNumberInput />);
      expect(wrapper.find('.sq-label').text()).to.eql('Credit Card');
    });

    it('should render a custom placeholder label', () => {
      const label = 'test';
      const wrapper = mount(<CreditCardNumberInput label={label} />);
      expect(wrapper.find('.sq-label').text()).to.eql(label);
    });

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardNumberInput label={''} />);
      expect(wrapper.find('.sq-label')).to.be.length(0);
    });
  });
});
