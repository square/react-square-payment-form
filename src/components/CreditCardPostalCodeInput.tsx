import * as React from 'react'
import { ContextConsumer } from './Context'

export interface CreditCardPostalCodeInputProps {
  /** Input field label */
  label?: string
}
/**
 * Renders a placeholder element for the postal code. The SqPaymentForm JS library will replace this
 * element with a secure `<iframe>` tag that will render an `<input>` field for the postal code.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
class CreditCardPostalCodeInput extends React.Component<CreditCardPostalCodeInputProps> {
  static defaultProps = {
    label: 'Postal',
  }

  render(): React.ReactElement {
    return (
      <ContextConsumer>
        {context => (
          <div>
            {this.props.label && <span className="sq-label">{this.props.label}</span>}
            <div id={`${context.formId}-sq-postal-code`}></div>
          </div>
        )}
      </ContextConsumer>
    )
  }
}

export default CreditCardPostalCodeInput
