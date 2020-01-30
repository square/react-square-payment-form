import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { SimpleCard } from '../SimpleCard';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

describe('SimpleCard', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <SimpleCard />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-card`)).to.be.length(1);
    });
  });
});
