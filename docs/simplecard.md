---
id: simplecard
title: Single-Element Payment Form
---

[Build a single-element payment form (Beta)](https://developer.squareup.com/docs/payment-form/payment-form-walkthrough#build-a-single-element-payment-form-beta)

Using the `SimpleCard` element is an alternative to building a payment form if you don't need the flexibility of individually placed payment card fields. [Read more about customizing the appearance](https://developer.squareup.com/docs/payment-form/cookbook/customize-form-styles#customize-the-appearance-of-the-single-element-payment-form).

```
import * as React from 'react'
import SquarePaymentForm, { CreditCardSubmitButton, SimpleCard } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'

const APPLICATION_ID = 'REPLACE_ME'

export default class PaymentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
    }
  }

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }

    this.setState({ errorMessages: [] })

    alert('nonce created: ' + nonce + ', buyerVerificationToken: ' + buyerVerificationToken)
    // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
  }

  render() {
    return (
      <SquarePaymentForm
        sandbox={true}
        applicationId={APPLICATION_ID}
        inputStyles={[{ fontFamily: 'monospace' }]}
        cardNonceResponseReceived={this.cardNonceResponseReceived}
      >

        <SimpleCard />

        <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>

        <div className="sq-error-message">
          {this.state.errorMessages.map(errorMessage => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>
      </SquarePaymentForm>
    )
  }
}
```

## Caveats

_You can **NOT** use digital wallets with `SimpleCard`._ If you would also like to accept payments with Apple Pay for Web, Google Pay, and Masterpass, you'll need to create a separate instance of `SquarePaymentForm` with digital wallet configuration.

```
render() {
    return (
      <>
        <SquarePaymentForm
          sandbox={true}
          applicationId={APPLICATION_ID}
          locationId={LOCATION_ID}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createPaymentRequest={this.createPaymentRequest}
          createVerificationDetails={this.createVerificationDetails}
        >
          <ApplePayButton loadingView={loadingView} unavailableView={unavailableApple} />
          <GooglePayButton loadingView={loadingView} unavailableView={unavailableGoogle} />
          <MasterpassButton loadingView={loadingView} unavailableView={unavailableMasterpass} />
        </SquarePaymentForm>

        <SquarePaymentForm
          sandbox={true}
          applicationId={APPLICATION_ID}
          inputStyles={[{ fontFamily: 'monospace' }]}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
        >
          <SimpleCard />

          <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>

          <div className="sq-error-message">
            {this.state.errorMessages.map(errorMessage => (
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            ))}
          </div>
        </SquarePaymentForm>
      </>
    )
  }
```
