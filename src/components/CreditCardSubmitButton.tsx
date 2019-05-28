import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardSubmitButtonProps {
  /** Input field label */
  label?: string;
}
/**
 * Renders a button that will create a card nonce using Square's SqPaymentForm JS library and calls
 * `onCardNonceResponseReceived` afterwards.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
const CreditCardSubmitButton: React.FunctionComponent<CreditCardSubmitButtonProps> = (props) =>
  <ContextConsumer>
    {context =>
      <button className="sq-creditcard" onClick={context.onCreateNonce}>
        {props.children ? props.children : 'Pay'}
      </button>
    }
  </ContextConsumer>

export default CreditCardSubmitButton