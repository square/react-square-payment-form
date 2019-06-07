import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import CreditCardPostalCodeInput from './CreditCardPostalCodeInput'
import { ContextInterface } from './Context'

let mockContext: ContextInterface = {}
jest.mock('./Context', () => ({
  ContextConsumer: (props: { children: (context: ContextInterface) => {} }) => {
    return props.children(mockContext)
  }
}))

describe('CreditCardPostalCodeInput', () => {

  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<CreditCardPostalCodeInput />)
      expect(wrapper.find(`#${mockContext.formId}-sq-postal-code`)).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardPostalCodeInput />)
      expect(wrapper.find(".sq-label")).to.be.length(1)
    })
  })

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardPostalCodeInput />)
      expect(wrapper.find(".sq-label").text()).to.eql('Postal')
    })

    it('should render a custom placeholder label', () => {
      const label = 'test'
      const wrapper = mount(<CreditCardPostalCodeInput label={label} />)
      expect(wrapper.find(".sq-label").text()).to.eql(label)
    })

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardPostalCodeInput label={''} />)
      expect(wrapper.find(".sq-label")).to.be.length(0)
    })
  })
})