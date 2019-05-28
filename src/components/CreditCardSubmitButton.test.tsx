import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import CreditCardSubmitButton from './CreditCardSubmitButton'

let mockContext: any = {}
jest.mock('./Context', () => ({
  ContextConsumer: (props: any) => {
    return props.children(mockContext)
  }
}))

describe('CreditCardPostalCodeInput', () => {

  beforeEach(() => {
    mockContext = {}
  })

  it('should render the class name for styling', () => {
    const wrapper = mount(<CreditCardSubmitButton />)
    expect(wrapper.find(".sq-creditcard")).to.be.length(1)
  })

  it('should call onCreateNonce when clicked', () => {
    mockContext = { onCreateNonce: jest.fn() }
    const wrapper = mount(<CreditCardSubmitButton />)
    wrapper.find('button').simulate('click')
    expect(mockContext.onCreateNonce.mock.calls.length).to.eql(1)
  })

  describe('children', () => {
    it('should render the default placeholder', () => {
      const wrapper = mount(<CreditCardSubmitButton />)
      expect(wrapper.find('button').text()).to.eql('Pay')
    })

    it('should render a custom placeholder', () => {
      const test = 'Pay $1.00'
      const wrapper = mount(<CreditCardSubmitButton>{test}</CreditCardSubmitButton>)
      expect(wrapper.find('button').text()).to.eql(test)
    })
  })
})