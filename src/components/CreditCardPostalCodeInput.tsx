import * as React from 'react'
import { ContextConsumer } from './Context'

export interface PostalCodeInputProps {
  /** Input field label */
  label?: string;
}
/**
 * Renders a placeholder element for the postal code. The SqPaymentForm JS library will replace this
 * element with a secure `<iframe>` tag that will render an `<input>` field for the postal code.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
const PostalCodeInput: React.FunctionComponent<PostalCodeInputProps> = ({ label }) =>
  <ContextConsumer>
    {context =>
      <div>
        {label && <span className="sq-label">{label}</span>}
        <div id={`${context.formId}-sq-postal-code`}></div>
      </div>
    }
  </ContextConsumer>

PostalCodeInput.defaultProps = {
  label: 'Postal'
}

export default PostalCodeInput
