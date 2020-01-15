import * as React from 'react'
import { ContextConsumer } from './Context'

/**
 * Renders a placeholder element for the single-element payment form. The SqPaymentForm JS library will replace this element with
 * a secure `<iframe>` tag that will render a form.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 *
 * Cannot be used with digital wallets
 */
class SimpleCard extends React.Component {
  render(): React.ReactElement {
    return <ContextConsumer>{context => <div id={`${context.formId}-sq-card`}></div>}</ContextConsumer>
  }
}

export default SimpleCard
