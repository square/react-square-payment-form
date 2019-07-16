import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardExpirationDateInputProps {
  /** Input field label */
  label?: string;
}

/**
 * Renders a placeholder element for the expiration date. The SqPaymentForm JS library will replace this
 * element with a secure `<iframe>` tag that will render an `<input>` field for the expiration date.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
class CreditCardExpirationDateInput extends React.Component<CreditCardExpirationDateInputProps> {

  static defaultProps = {
    label: 'Expiration'
  }

  render() {
    return (
      <ContextConsumer>
        {context =>
          <div>
            {this.props.label && <span className="sq-label">{this.props.label}</span>}
            <div id={`${context.formId}-sq-expiration-date`}></div>
          </div>
        }
      </ContextConsumer>
    )
  }
}

export default CreditCardExpirationDateInput