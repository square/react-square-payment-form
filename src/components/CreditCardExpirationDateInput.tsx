import * as React from 'react'
import { ContextConsumer } from './Context'

export interface ExpirationDateInputProps {
  /** Input field label */
  label?: string;
}

/**
 * Renders a placeholder element for the expiration date. The SqPaymentForm JS library will replace this
 * element with a secure `<iframe>` tag that will render an `<input>` field for the expiration date.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
const ExpirationDateInput: React.FunctionComponent<ExpirationDateInputProps> = ({ label }) =>
  <ContextConsumer>
    {context =>
      <div>
        {label && <span className="sq-label">{label}</span>}
        <div id={`${context.formId}-sq-expiration-date`}></div>
      </div>
    }
  </ContextConsumer>

ExpirationDateInput.defaultProps = {
  label: 'Expiration'
}

export default ExpirationDateInput