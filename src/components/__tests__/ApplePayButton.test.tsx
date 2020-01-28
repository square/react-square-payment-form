import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import ApplePayButton from '../ApplePayButton'
import { ContextInterface } from '../Context'

let mockContext: ContextInterface = {}
jest.mock('../Context', () => ({
  ContextConsumer: (props: { children: (context: ContextInterface) => {} }) => {
    return props.children(mockContext)
  },
}))

describe('ApplePayButton', () => {
  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<ApplePayButton />)
      expect(wrapper.find(`#${mockContext.formId}-sq-apple-pay`)).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      const wrapper = mount(<ApplePayButton />)
      expect(wrapper.find('.sq-apple-pay')).to.be.length(1)
    })
  })

  describe('applePayState', () => {
    it('should hide the button when applePayState != ready', () => {
      mockContext = { applePayState: 'loading' }
      const wrapper = mount(<ApplePayButton />)
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'none')
    })

    it('should only display the button when applePayState = ready', () => {
      mockContext = { applePayState: 'ready' }
      const wrapper = mount(<ApplePayButton />)
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'block')
    })

    it('should display the unavailable view when applePayState = unavailable', () => {
      mockContext = { applePayState: 'unavailable' }
      const unavailableView = <div id="unavailable"></div>
      const wrapper = mount(<ApplePayButton unavailableView={unavailableView} />)
      expect(wrapper.find('#unavailable')).to.be.length(1)
    })

    it('should display the loading view when applePayState = loading', () => {
      mockContext = { applePayState: 'loading' }
      const loadingView = <div id="loading"></div>
      const wrapper = mount(<ApplePayButton loadingView={loadingView} />)
      expect(wrapper.find('#loading')).to.be.length(1)
    })
  })
})
