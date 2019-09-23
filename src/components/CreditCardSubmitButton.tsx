import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardSubmitButtonProps {
  /** Input field label */
  children?: React.ReactNode
}
/**
 * Renders a button that will create a card nonce using Square's SqPaymentForm JS library and calls
 * `onCardNonceResponseReceived` afterwards.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
class CreditCardSubmitButton extends React.Component<CreditCardSubmitButtonProps> {
  render(): React.ReactElement {
    return (
      <ContextConsumer>
        {context => (
          <button className="sq-creditcard" onClick={context.onCreateNonce}>
            {this.props.children ? this.props.children : 'Pay'}
          </button>
        )}
      </ContextConsumer>
    )
  }
}

export default CreditCardSubmitButton
