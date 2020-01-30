import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { MasterpassButton } from '../MasterpassButton';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;
describe('MasterpassButton', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <MasterpassButton />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-masterpass`)).to.be.length(1);
    });

    it('should render the class name for styling', () => {
      const wrapper = mount(<MasterpassButton />);
      expect(wrapper.find('.sq-masterpass')).to.be.length(1);
    });
  });

  describe('masterpassState', () => {
    it('should hide the button when masterpassState != ready', () => {
      mockContext.masterpassState = 'loading';
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <MasterpassButton />
        </Context.Provider>
      );
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'none');
    });

    it('should only display the button when masterpassState = ready', () => {
      mockContext.masterpassState = 'ready';
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <MasterpassButton />
        </Context.Provider>
      );
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'block');
    });

    it('should display the unavailable view when masterpassState = unavailable', () => {
      mockContext.masterpassState = 'unavailable';
      const unavailableView = <div id="unavailable"></div>;
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <MasterpassButton unavailableView={unavailableView} />{' '}
        </Context.Provider>
      );
      expect(wrapper.find('#unavailable')).to.be.length(1);
    });

    it('should display the loading view when masterpassState = loading', () => {
      mockContext.masterpassState = 'loading';
      const loadingView = <div id="loading"></div>;
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <MasterpassButton loadingView={loadingView} />
        </Context.Provider>
      );
      expect(wrapper.find('#loading')).to.be.length(1);
    });
  });
});
