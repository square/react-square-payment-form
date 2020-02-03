import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { GooglePayButton } from '../GooglePayButton';
import Context from '../Context';
import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;
describe('GooglePayButton', () => {
  beforeEach(() => {
    mockContext = MockContext;
  });

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <GooglePayButton />
        </Context.Provider>
      );
      expect(wrapper.find(`#${mockContext.formId}-sq-google-pay`)).to.be.length(1);
    });

    it('should render the class name for styling', () => {
      const wrapper = mount(<GooglePayButton />);
      expect(wrapper.find('.sq-google-pay')).to.be.length(1);
    });
  });

  describe('googlePayState', () => {
    it('should hide the button when googlePayState != ready', () => {
      mockContext.googlePayState = 'loading';
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <GooglePayButton />
        </Context.Provider>
      );
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'none');
    });

    it('should only display the button when googlePayState = ready', () => {
      mockContext.googlePayState = 'ready';
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <GooglePayButton />
        </Context.Provider>
      );
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'block');
    });

    it('should display the unavailable view when googlePayState = unavailable', () => {
      mockContext.googlePayState = 'unavailable';
      const unavailableView = <div id="unavailable"></div>;
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <GooglePayButton unavailableView={unavailableView} />{' '}
        </Context.Provider>
      );
      expect(wrapper.find('#unavailable')).to.be.length(1);
    });

    it('should display the loading view when googlePayState = loading', () => {
      mockContext.googlePayState = 'loading';
      const loadingView = <div id="loading"></div>;
      const wrapper = mount(
        <Context.Provider value={mockContext}>
          <GooglePayButton loadingView={loadingView} />
        </Context.Provider>
      );
      expect(wrapper.find('#loading')).to.be.length(1);
    });
  });
});
