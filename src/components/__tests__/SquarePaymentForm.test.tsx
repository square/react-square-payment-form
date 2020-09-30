/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SquarePaymentForm } from '../SquarePaymentForm'

describe('SquarePaymentForm', () => {
  let wrapper: any
  const cardNonceResponseReceived = jest.fn()
  const paymentFormLoaded = jest.fn()
  const methodsSupportedCustom = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <SquarePaymentForm
        applicationId={'test'}
        locationId={'test'}
        cardNonceResponseReceived={cardNonceResponseReceived}
        paymentFormLoaded={paymentFormLoaded}
        methodsSupported={methodsSupportedCustom}
      />
    )
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
      instance.componentDidUpdate()
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
    it('should load the library successfully', async () => {
      const instance = wrapper.instance()
      const onSuccess = jest.fn()
      const onError = jest.fn()
      instance.loadSqPaymentFormLibrary(onSuccess, onError)
      setTimeout(() => {
        expect(onSuccess.mock.calls.length).to.eql(1)
        expect(onError.mock.calls.length).to.eql(0)
      }, 0)
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

    it('should coorectly set the component state for each method and state', () => {
      ;['applePay', 'googlePay', 'masterpass'].forEach(method => {
        ;['ready', 'unavailable'].forEach(state => {
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

    it('should also call the custom methodsSupported prop if supplied', () => {
      ;['applePay', 'googlePay', 'masterpass'].forEach(method => {
        ;['ready', 'unavailable'].forEach(state => {
          const key = `${method}State`
          it(`should set ${key} = ${state}`, () => {
            const instance = wrapper.instance()
            methodsSupportedCustom.mockClear()
            const supported = state === 'ready' ? true : false;
            instance.methodsSupported({ [method]: supported })
            expect(methodsSupportedCustom.mock.calls.length).to.eql(1)
            expect(methodsSupportedCustom.mock.calls[0][0]).to.eql({ [method]: supported })
            methodsSupportedCustom.mockClear()
          })
        })
      })
    })
  })

  describe('render', () => {
    it('should render the default form id', () => {
      wrapper.instance().setState({ errorMessage: null })
      expect(wrapper.find('#sq-payment-form')).to.be.length(1)
    })

    it('should render the class name for styling', () => {
      expect(wrapper.find('.sq-payment-form')).to.be.length(1)
    })

    it('should render errors from loading the payment form', () => {
      wrapper.instance().setState({ errorMessage: 'Whoops' })
      expect(wrapper.find('.sq-error-message')).to.be.length(1)
    })
  })

  describe('cardNonceResponseReceived', () => {
    it('should call props.cardNonceResponseReceived', () => {
      const instance = wrapper.instance()
      instance.cardNonceResponseReceived()
      expect(cardNonceResponseReceived.mock.calls.length).to.eql(1)
    })

    it('should call SqPaymentForm.verifyBuyer when createVerificationDetails exists', () => {
      wrapper.setProps({ createVerificationDetails: jest.fn() })
      const instance = wrapper.instance()
      const paymentForm = { verifyBuyer: jest.fn() }
      instance.paymentForm = paymentForm
      instance.cardNonceResponseReceived()
      expect(paymentForm.verifyBuyer.mock.calls.length).to.eql(1)
    })

    it('should call createVerificationDetails when createVerificationDetails exists', () => {
      var createVerificationDetails = jest.fn()
      wrapper.setProps({ createVerificationDetails })
      const instance = wrapper.instance()
      const paymentForm = { verifyBuyer: jest.fn() }
      instance.paymentForm = paymentForm
      instance.cardNonceResponseReceived()
      expect(createVerificationDetails.mock.calls.length).to.eql(1)
    })
  })

  describe('paymentFormLoaded', () => {
    it('should call props.paymentFormLoaded', () => {
      const instance = wrapper.instance()
      instance.paymentFormLoaded()
      expect(paymentFormLoaded.mock.calls.length).to.eql(1)
    })

    it('should call SqPaymentForm.recalculateSize ', () => {
      const instance = wrapper.instance()
      const paymentForm = { recalculateSize: jest.fn() }
      instance.paymentForm = paymentForm
      instance.paymentFormLoaded()
      expect(paymentForm.recalculateSize.mock.calls.length).to.eql(1)
    })
  })

  describe('buildSqPaymentFormConfiguration', () => {
    const props: any = {
      applicationId: 'app-id',
      locationId: 'loc-id',
    }
    const callbacks: any = {
      createPaymentRequest: 'createPaymentRequest',
      inputEventReceived: 'inputEventReceived',
      methodsSupported: 'methodsSupported',
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

    it('should not set cardNonceResponseReceived if cardNonceResponseReceived prop is missing', () => {
      const config = wrapper.instance().buildSqPaymentFormConfiguration({ cardNonceResponseReceived: null })
      expect(config.callbacks['cardNonceResponseReceived']).to.be.null
    })

    it('should set cardNonceResponseReceived if cardNonceResponseReceived prop is passed', () => {
      const config = wrapper.instance().buildSqPaymentFormConfiguration({ cardNonceResponseReceived: jest.fn() })
      expect(config.callbacks['cardNonceResponseReceived']).to.eql(wrapper.instance().cardNonceResponseReceived)
    })
  })
})
