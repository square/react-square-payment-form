---
id:SquarePaymentForm
title:SquarePaymentForm
---
Creates a Square Payment Form and renders form inputs to use inside of it.

This component requires 3 arguments for basic use:
* **applicationId**: This can be found in your [Square Developer Dashboard](https://developer.squareup.com/apps)
for the current Square app you're developing
* **locationId**: You can retrieve this from the [Square Connect v2 Locations API](https://docs.connect.squareup.com/api/connect/v2#navsection-locations);
or your [Square Developer Dashboard](https://developer.squareup.com/apps).
It determines which Square location will receive credit for payments made with this form.
* **cardNonceResponseReceived**: This callback gives you a nonce to pass to your back-end server to make a "charge" request to Square.
* **createVerificationDetails**: This callback returns data used for [Strong Customer Authentication](https://developer.squareup.com/docs/sca-overview)

...and one additional argument for digital wallets:
* **createPaymentRequest**: This callback returns data to show information about the payment in the Apple Pay, Google Pay, and Masterpass interfaces.

Please view the [Payment Form Data Models](https://docs.connect.squareup.com/api/paymentform) for additional information.
## Props
|Name|Type|Description|Default Value|
|---|---|---|---|
|applicationId|string|<b>Required for all features</b><br/><br/>Identifies the calling form with a verified application ID generated from the Square Application Dashboard||
|locationId|string|<b>Required for all features</b><br/><br/>Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.||
|formId|string|<b>Required for all features</b><br/><br/>Identifies the DOM form element|`'sq-payment-form'`|
|inputStyles|Array|Define the internal styles applied to the rendered iframes|`[  {    fontSize: '16px',    fontFamily: 'Helvetica Neue',    padding: '16px',    color: '#373F4A',    backgroundColor: 'transparent',    lineHeight: '24px',    placeholderColor: '#CCC',    _webkitFontSmoothing: 'antialiased',    _mozOsxFontSmoothing: 'grayscale',  },]`|
|apiWrapper|string|Internal variable: used for logs|`'reactjs/0.5.0'`|
|sandbox|boolean|Enables Sandbox mode|`false`|
|children|ReactReactNode|Square payment form components||
|cardNonceResponseReceived|`(  errors: [SqError],  nonce: string,  cardData: SqCardData,  buyerVerificationToken?: string,  billingContact?: SqContact,  shippingContact?: SqContact,  shippingOption?: SqShippingOption) => void`|<b>Required for all features</b><br/><br/>Invoked when payment form receives the result of a nonce generation request. The result will be a valid credit card or wallet nonce, or an error.||
|createPaymentRequest|`() => SqPaymentRequest`|<b>Required for digital wallets</b><br/><br/>Invoked when a digital wallet payment button is clicked.||
|createVerificationDetails|`() => SqVerificationDetails`|<b>Required for SCA</b><br/><br/>||
|methodsSupported|`(methods: SqMethods) => void`|||
|inputEventReceived|`() => void`|Invoked when visitors interact with the iframe elements||
|paymentFormLoaded|`() => void`|Invoked when payment form is fully loaded||
|shippingContactChanged|`(shippingContact: SqContact, done: ({}) => {}) => void`|Invoked when requestShippingAddress is true in PaymentRequest and the buyer selects a shipping address in the Apple Pay sheet or enters a new shipping address.||
|shippingOptionChanged|`(shippingOption: SqShippingOption, done: ({}) => {}) => void`|Invoked when the buyer selects a shipping option in the Apple Pay sheet.||
|unsupportedBrowserDetected|`() => void`|Invoked when the payment form is hosted in an unsupported browser||