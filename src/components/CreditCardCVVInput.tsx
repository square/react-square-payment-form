import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardCVVInputProps {
  /** Input field label */
  label?: string;
}

/**
 * Renders a placeholder element for the CVV code. The SqPaymentForm JS library will replace this element with
 * a secure `<iframe>` tag that will render an `<input>` field for the CVV code.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
const CreditCardCVVInput: React.FunctionComponent<CreditCardCVVInputProps> = ({ label }) =>
  <ContextConsumer>
    {context =>
      <div>
        {label && <span className="sq-label">{label}</span>}
        <div id={`${context.formId}-sq-cvv`}></div>
      </div>
    }
  </ContextConsumer>

CreditCardCVVInput.defaultProps = {
  label: 'CVV'
}

export default CreditCardCVVInput