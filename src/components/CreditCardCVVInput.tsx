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
class CreditCardCVVInput extends React.Component<CreditCardCVVInputProps> {

  static defaultProps = {
    label: 'CVV'
  }

  render(): React.ReactElement {
    return (
      <ContextConsumer>
        {context =>
          <div>
            {this.props.label && <span className="sq-label">{this.props.label}</span>}
            <div id={`${context.formId}-sq-cvv`}></div>
          </div>
        }
      </ContextConsumer>
    )
  }
}

export default CreditCardCVVInput