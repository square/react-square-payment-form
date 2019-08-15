import * as React from 'react'
import { SqError, SqCardData, SqContact, SqMethods, SqPaymentRequest, SqShippingOption, SqPaymentFormConfiguration, SqVerificationResult, SqVerificationDetails } from './models'
import { ContextProvider } from './Context'

declare class SqPaymentForm {
  constructor(configuration: SqPaymentFormConfiguration)

  build: () => void
  destroy: () => void
  recalculateSize: () => void
  requestCardNonce: () => void
  verifyBuyer: (source: string, verificationDetails: SqVerificationDetails, callback: ((err: [SqError], verificationResult: SqVerificationResult) => void)) => void
}

export interface SquarePaymentFormProps {
  /** <b>Required for all features</b><br/><br/>Identifies the calling form with a verified application ID generated from the Square Application Dashboard */
  applicationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.*/
  locationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the DOM form element*/
  formId: string;
  /** Define the internal styles applied to the rendered iframes */
  inputStyles?: {}[];
  /** Internal variable: used for logs */
  apiWrapper: string;
  /** Enables Sandbox mode */
  sandbox: boolean;

  /** <b>Required for all features</b><br/><br/>Invoked when payment form receives the result of a nonce generation request. The result will be a valid credit card or wallet nonce, or an error.*/
  cardNonceResponseReceived: (errors: [SqError], nonce: string, cardData: SqCardData, buyerVerificationToken?: string) => void;
  /** <b>Required for digital wallets</b><br/><br/>Invoked when a digital wallet payment button is clicked.*/
  createPaymentRequest?: () => SqPaymentRequest;
  /** <b>Required for SCA</b><br/><br/> */
  createVerificationDetails?: () => SqVerificationDetails;
  /* Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form */
  methodsSupported?: (methods: SqMethods) => void;
  /** Invoked when visitors interact with the iframe elements */
  inputEventReceived?: () => void;
  /** Invoked when payment form is fully loaded */
  paymentFormLoaded?: () => void;
  /** Invoked when requestShippingAddress is true in PaymentRequest and the buyer selects a shipping address in the Apple Pay sheet or enters a new shipping address.*/
  shippingContactChanged?: (shippingContact: SqContact, done: ({}) => {}) => void;
  /** Invoked when the buyer selects a shipping option in the Apple Pay sheet. */
  shippingOptionChanged?: (shippingOption: SqShippingOption, done: ({}) => {}) => void;
  /** Invoked when the payment form is hosted in an unsupported browser */
  unsupportedBrowserDetected?: () => void;
}

interface State {
  applePayState: string;
  googlePayState: string;
  masterpassState: string;
  errorMessage?: string;
  scriptLoaded: boolean;
}

/**
 * Creates a Square Payment Form and renders form inputs to use inside of it.
 *
 * This component requires 3 arguments for basic use:
 * * **applicationId**: This can be found in your [Square Developer Dashboard](https://connect.squareup.com/apps)
 * for the current Square app you're developing
 * * **locationId**: You can retrieve this from the [Square Connect v2 Locations API](https://docs.connect.squareup.com/api/connect/v2#navsection-locations);
 * or your [Square Developer Dashboard](https://connect.squareup.com/apps).
 * It determines which Square location will receive credit for transactions made with this form.
 * * **cardNonceResponseReceived**: This callback gives you a nonce to pass to your back-end server to make a "charge" request to Square.
 * * **createVerificationDetails**: This callback returns data used for [Strong Customer Authentication](https://developer.squareup.com/docs/sca-overview)
 *
 * ...and one additional argument for digital wallets:
 * * **createPaymentRequest**: This callback returns data to show information about the payment in the Apple Pay, Google Pay, and Masterpass interfaces.
 *
 * Please view the [Payment Form Data Models](https://docs.connect.squareup.com/api/paymentform) for additional information.
 */
class SquarePaymentForm extends React.Component<SquarePaymentFormProps, State> {

  paymentForm?: SqPaymentForm

  static defaultProps = {
    formId: 'sq-payment-form',
    apiWrapper: 'reactjs/0.3.0',
    sandbox: false,
    inputStyles: [{
      fontSize: '16px',
      fontFamily: 'Helvetica Neue',
      padding: '16px',
      color: '#373F4A',
      backgroundColor: 'transparent',
      lineHeight: '24px',
      placeholderColor: '#CCC',
      _webkitFontSmoothing: 'antialiased',
      _mozOsxFontSmoothing: 'grayscale'
    }]
  }

  constructor(props: SquarePaymentFormProps) {
    super(props)
    this.state = {
      applePayState: 'loading',
      googlePayState: 'loading',
      masterpassState: 'loading',
      errorMessage: undefined,
      scriptLoaded: false,
    }
  }

  componentDidUpdate(): void {
    this.renderSqPaymentForm()
  }

  componentDidMount(): void {
    this.loadSqPaymentFormLibrary(
      () => this.setState({ scriptLoaded: true }),
      () => this.setState({ errorMessage: 'Unable to load Square payment library' })
    )
  }

  componentWillUnmount(): void {
    if (this.paymentForm) {
      this.paymentForm.destroy()
      this.paymentForm = undefined
    }
  }

  loadSqPaymentFormLibrary = (onSuccess?: () => void, onError?: () => void) => {
    if (typeof SqPaymentForm === "function") {
      onSuccess && onSuccess()
      return
    }
    const script = document.createElement('script')
    if (this.props.sandbox) {
      script.src = 'https://js.squareupsandbox.com/v2/paymentform'
    } else {
      script.src = 'https://js.squareup.com/v2/paymentform'
    }
    script.onload = function() {
      onSuccess && onSuccess()
    }
    script.onerror = function() {
      onError && onError()
    }
    document.body.appendChild(script)
  }

  renderSqPaymentForm = () => {
    if (!this.state.scriptLoaded || this.paymentForm || (this.state.errorMessage && this.state.errorMessage.length)) {
      return
    }

    try {
      this.paymentForm = new SqPaymentForm(this.buildSqPaymentFormConfiguration({ methodsSupported: this.methodsSupported, ...this.props}))
      this.paymentForm.build()
    } catch (error) {
      let errorMesasge = error.message || 'Unable to build Square payment form'
      this.setState({ errorMessage: errorMesasge })
    }
  }

  createNonce = (event: React.MouseEvent) => {
    event.preventDefault()
    this.paymentForm && this.paymentForm.requestCardNonce()
  }

  verifyBuyer = (source: string, verificationDetails: SqVerificationDetails, callback: ((err: [SqError], verificationResult: SqVerificationResult) => void)) => {
    this.paymentForm && this.paymentForm.verifyBuyer(source, verificationDetails, callback)
  }

  cardNonceResponseReceived = (errors: [SqError], nonce: string, cardData: SqCardData) => {
    if (errors || !this.props.createVerificationDetails) {
      this.props.cardNonceResponseReceived(errors, nonce, cardData)
      return
    }

    this.paymentForm && this.paymentForm.verifyBuyer(
      nonce,
      this.props.createVerificationDetails(),
      (err: [SqError], result: SqVerificationResult) => {
        this.props.cardNonceResponseReceived(err, nonce, cardData, result.token)
      }
    )
  }

  methodsSupported = (methods: SqMethods) => {
    const keys = Object.keys(methods)

    if (keys.indexOf('masterpass') > -1) {
      this.setState({ masterpassState: methods.masterpass === true ? 'ready' : 'unavailable' })
    }
    if (keys.indexOf('applePay') > -1) {
      this.setState({ applePayState: methods.applePay === true ? 'ready' : 'unavailable' })
    }
    if (keys.indexOf('googlePay') > -1) {
      this.setState({ googlePayState: methods.googlePay === true ? 'ready' : 'unavailable' })
    }
  }

  paymentFormLoaded = () => {
    this.paymentForm && this.paymentForm.recalculateSize()
    this.props.paymentFormLoaded && this.props.paymentFormLoaded()
  }

  buildSqPaymentFormConfiguration(props: SquarePaymentFormProps): SqPaymentFormConfiguration {
    const config: SqPaymentFormConfiguration = {
      applicationId: props.applicationId,
      locationId: props.locationId,
      autoBuild: false,
      inputClass: 'sq-input',
      inputStyles: props.inputStyles,
      apiWrapper: props.apiWrapper,
      callbacks: {
        cardNonceResponseReceived: props.cardNonceResponseReceived ? this.cardNonceResponseReceived: null, // handles missing callback error
        createPaymentRequest: props.createPaymentRequest,
        inputEventReceived: props.inputEventReceived,
        methodsSupported: props.methodsSupported,
        paymentFormLoaded: this.paymentFormLoaded,
        shippingContactChanged: props.shippingContactChanged,
        shippingOptionChanged: props.shippingOptionChanged,
        unsupportedBrowserDetected: props.unsupportedBrowserDetected,
      }
    }

    if (document.getElementById(`${props.formId}-sq-apple-pay`)) {
      config.applePay = { elementId: `${props.formId}-sq-apple-pay`}
    }
    if (document.getElementById(`${props.formId}-sq-google-pay`)) {
      config.googlePay = { elementId: `${props.formId}-sq-google-pay` }
    }
    if (document.getElementById(`${props.formId}-sq-masterpass`)) {
      config.masterpass = { elementId: `${props.formId}-sq-masterpass` }
    }

    if (document.getElementById(`${props.formId}-sq-card-number`)) {
      config.cardNumber = { elementId: `${props.formId}-sq-card-number`, placeholder: '• • • •  • • • •  • • • •  • • • •' }
    }
    if (document.getElementById(`${props.formId}-sq-cvv`)) {
      config.cvv = { elementId: `${props.formId}-sq-cvv`, placeholder: 'CVV '}
    }
    if (document.getElementById(`${props.formId}-sq-postal-code`)) {
      config.postalCode = { elementId: `${props.formId}-sq-postal-code`, placeholder: '12345' }
    } else {
      config.postalCode = false
    }
    if (document.getElementById(`${props.formId}-sq-expiration-date`)) {
      config.expirationDate = { elementId: `${props.formId}-sq-expiration-date`, placeholder: 'MM/YY' }
    }
    return config
  }

  render(): React.ReactElement {
    const { applePayState, googlePayState, masterpassState, errorMessage } = this.state
    if (errorMessage) {
      return (
        <div className="sq-payment-form">
          <div className="sq-error-message">{errorMessage}</div>
        </div>
      )
    }

    const context = {
      applePayState,
      googlePayState,
      masterpassState,
      formId: this.props.formId,
      onCreateNonce: this.createNonce,
      onVerifyBuyer: this.verifyBuyer
    }

    return (
      <ContextProvider value={context}>
        <div id={this.props.formId} className="sq-payment-form">
          {this.props.children}
        </div>
      </ContextProvider>
    )
  }
}

export default SquarePaymentForm
