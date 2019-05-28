import * as React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import SquarePaymentForm from './SquarePaymentForm'

describe('SquarePaymentForm', () => {

  let wrapper: any

  beforeEach(() => {
    wrapper = shallow(<SquarePaymentForm applicationId={'test'} locationId={'test'} cardNonceResponseReceived={() => {}} />)
    wrapper.instance().renderSqPaymentForm = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.update()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('componentDidMount', () => {
    it('should call loadSqPaymentFormLibrary', () => {
      const instance = wrapper.instance()
      jest.spyOn(instance, 'loadSqPaymentFormLibrary')
      instance.componentDidMount()
      expect(instance.loadSqPaymentFormLibrary.mock.calls.length).to.eql(1)
    })
  })

  describe('componentDidUpdate', () => {
    it('should call renderSqPaymentForm', () => {
      const instance = wrapper.instance()
      jest.spyOn(instance, 'renderSqPaymentForm')
      instance.componentDidMount()
      expect(instance.renderSqPaymentForm.mock.calls.length).to.eql(1)
    })
  })

  describe('componentWillUnmount', () => {
    it('should not call paymentForm.destroy() if the payment form does exists', () => {
      const instance = wrapper.instance()
      const paymentForm = { destroy: jest.fn() }
      instance.componentWillUnmount()
      expect(paymentForm.destroy.mock.calls.length).to.eql(0)
    })

    it('should call paymentForm.destroy() if the payment form exists', () => {
      const instance = wrapper.instance()
      const paymentForm = { destroy: jest.fn() }
      instance.paymentForm = paymentForm
      instance.componentWillUnmount()
      expect(paymentForm.destroy.mock.calls.length).to.eql(1)
    })
  })

  describe('loadSqPaymentFormLibrary', () => {
    it('should load the library successfully', () => {
      const instance = wrapper.instance()
      const onSuccess = jest.fn()
      const onError = jest.fn()
      instance.loadSqPaymentFormLibrary(onSuccess, onError)
      expect(onSuccess.mock.calls.length).to.eql(1)
      expect(onError.mock.calls.length).to.eql(0)
    })
  })

  describe('createNonce', () => {
    it('should call SqPaymentForm.requestCardNonce', () => {
      const instance = wrapper.instance()
      const paymentForm = { requestCardNonce: jest.fn() }
      instance.paymentForm = paymentForm
      const mockEvent = { preventDefault() {} }
      instance.createNonce(mockEvent)
      expect(paymentForm.requestCardNonce.mock.calls.length).to.eql(1)
    })
  })

  describe('methodsSupported', () => {
    ['applePay', 'googlePay', 'masterpass'].forEach(method => {
      ['ready', 'unavailable'].forEach(state => {
        const key = `${method}State`
        it(`should set ${key} = ${state}`, () => {
          const instance = wrapper.instance()
          const spy = jest.spyOn(instance, 'setState')
          spy.mockClear()
          instance.methodsSupported({ [method]: state === 'ready' ? true : false })
          expect(spy.mock.calls.length).to.eql(1)
          expect(instance.state[key]).to.eql(state)
          spy.mockClear()
        })
      })
    })
  })

  describe('render', () => {
    it('should render the default form id', () => {
      wrapper.instance().setState({ errorMessage: null })
      expect(wrapper.find("#sq-payment-form")).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      expect(wrapper.find(".sq-payment-form")).to.be.length(1)
    })

    it('should render errors from loading the payment form', () => {
      wrapper.instance().setState({ errorMessage: 'Whoops' })
      expect(wrapper.find(".sq-error-message")).to.be.length(1)
    })
  })

  describe('buildSqPaymentFormConfiguration', () => {
    const props: any = {
      applicationId: 'app-id',
      locationId: 'loc-id',
      env: 'staging',
    }
    const callbacks: any = {
      cardNonceResponseReceived: 'cardNonceResponseReceived',
      createPaymentRequest: 'createPaymentRequest',
      inputEventReceived: 'inputEventReceived',
      methodsSupported: 'methodsSupported',
      paymentFormLoaded: 'paymentFormLoaded',
      shippingContactChanged: 'shippingContactChanged',
      shippingOptionChanged: 'shippingOptionChanged',
      unsupportedBrowserDetected: 'unsupportedBrowserDetected',
    }

    it('should map to props to the correct config locations', () => {
      const config = wrapper.instance().buildSqPaymentFormConfiguration(Object.assign({}, props, callbacks))
      Object.keys(props).forEach(key => {
        expect(config[key]).to.eql(props[key])
      })

      expect(config.autoBuild).to.be.false
      expect(config.inputClass).to.eql('sq-input')

      Object.keys(callbacks).forEach(key => {
        expect(config.callbacks[key]).to.eql(callbacks[key])
      })
    })
  })
})
