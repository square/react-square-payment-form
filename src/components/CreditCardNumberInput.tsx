import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardNumberInputProps {
  /** Input field label */
  label?: string;
}
/**
 * Renders a placeholder element for the card number. The SqPaymentForm JS library will replace this
 * element with a secure `<iframe>` tag that will render an `<input>` field for the card number.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
const CreditCardNumberInput: React.FunctionComponent<CreditCardNumberInputProps> = ({ label }) =>
  <ContextConsumer>
    {context =>
      <div>
        {label && <span className="sq-label">{label}</span>}
        <div id={`${context.formId}-sq-card-number`}></div>
      </div>
    }
  </ContextConsumer>

CreditCardNumberInput.defaultProps = {
  label: 'Credit Card'
}

export default CreditCardNumberInput