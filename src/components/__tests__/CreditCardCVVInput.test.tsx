import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CreditCardCVVInput } from '../CreditCardCVVInput';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

describe('CreditCardCVVInput', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <CreditCardCVVInput />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-cvv`)).to.be.length(1);
    });

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardCVVInput />);
      expect(wrapper.find('.sq-label')).to.be.length(1);
    });
  });

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardCVVInput />);
      expect(wrapper.find('.sq-label').text()).to.eql('CVV');
    });

    it('should render a custom placeholder label', () => {
      const label = 'test';
      const wrapper = mount(<CreditCardCVVInput label={label} />);
      expect(wrapper.find('.sq-label').text()).to.eql(label);
    });

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardCVVInput label={''} />);
      expect(wrapper.find('.sq-label')).to.be.length(0);
    });
  });
});
