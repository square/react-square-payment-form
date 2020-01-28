import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import CreditCardExpirationDateInput from '../CreditCardExpirationDateInput'
import { ContextInterface } from '../Context'

let mockContext: ContextInterface = {}
jest.mock('../Context', () => ({
  ContextConsumer: (props: { children: (context: ContextInterface) => {} }) => {
    return props.children(mockContext)
  },
}))

describe('CreditCardExpirationDateInput', () => {
  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<CreditCardExpirationDateInput />)
      expect(wrapper.find(`#${mockContext.formId}-sq-expiration-date`)).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      const wrapper = mount(<CreditCardExpirationDateInput />)
      expect(wrapper.find('.sq-label')).to.be.length(1)
    })
  })

  describe('label', () => {
    it('should render the default placeholder label', () => {
      const wrapper = mount(<CreditCardExpirationDateInput />)
      expect(wrapper.find('.sq-label').text()).to.eql('Expiration')
    })

    it('should render a custom placeholder label', () => {
      const label = 'test'
      const wrapper = mount(<CreditCardExpirationDateInput label={label} />)
      expect(wrapper.find('.sq-label').text()).to.eql(label)
    })

    it('should not render the placeholder label', () => {
      const wrapper = mount(<CreditCardExpirationDateInput label={''} />)
      expect(wrapper.find('.sq-label')).to.be.length(0)
    })
  })
})
