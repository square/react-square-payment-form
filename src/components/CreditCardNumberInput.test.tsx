import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import CreditCardNumberInput from './CreditCardNumberInput'

let mockContext: any = {}
jest.mock('./Context', () => ({
  ContextConsumer: (props: any) => {
    return props.children(mockContext)
  }
}))

describe('CreditCardNumberInput', () => {

  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<CreditCardNumberInput />)
      expect(wrapper.find(`#${mockContext.formId}-sq-card-number`)).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardNumberInput />)
      expect(wrapper.find(".sq-label")).to.be.length(1)
    })
  })

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardNumberInput />)
      expect(wrapper.find(".sq-label").text()).to.eql('Credit Card')
    })

    it('should render a custom placeholder label', () => {
      const label = 'test'
      const wrapper = mount(<CreditCardNumberInput label={label} />)
      expect(wrapper.find(".sq-label").text()).to.eql(label)
    })

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardNumberInput label={''} />)
      expect(wrapper.find(".sq-label")).to.be.length(0)
    })
  })
})