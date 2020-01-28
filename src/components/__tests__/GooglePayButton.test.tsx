import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import GooglePayButton from '../GooglePayButton'
import { ContextInterface } from '../Context'

let mockContext: ContextInterface = {}
jest.mock('../Context', () => ({
  ContextConsumer: (props: { children: (context: ContextInterface) => {} }) => {
    return props.children(mockContext)
  },
}))

describe('GooglePayButton', () => {
  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<GooglePayButton />)
      expect(wrapper.find(`#${mockContext.formId}-sq-google-pay`)).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      const wrapper = mount(<GooglePayButton />)
      expect(wrapper.find('.sq-google-pay')).to.be.length(1)
    })
  })

  describe('googlePayState', () => {
    it('should hide the button when googlePayState != ready', () => {
      mockContext = { googlePayState: 'loading' }
      const wrapper = mount(<GooglePayButton />)
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'none')
    })

    it('should only display the button when googlePayState = ready', () => {
      mockContext = { googlePayState: 'ready' }
      const wrapper = mount(<GooglePayButton />)
      expect(wrapper.find('button').prop('style')).to.have.property('display', 'block')
    })

    it('should display the unavailable view when googlePayState = unavailable', () => {
      mockContext = { googlePayState: 'unavailable' }
      const unavailableView = <div id="unavailable"></div>
      const wrapper = mount(<GooglePayButton unavailableView={unavailableView} />)
      expect(wrapper.find('#unavailable')).to.be.length(1)
    })

    it('should display the loading view when googlePayState = loading', () => {
      mockContext = { googlePayState: 'loading' }
      const loadingView = <div id="loading"></div>
      const wrapper = mount(<GooglePayButton loadingView={loadingView} />)
      expect(wrapper.find('#loading')).to.be.length(1)
    })
  })
})
