import * as React from 'react'
import { ContextConsumer } from './Context'

export interface ApplePayButtonProps {
  /** Placeholder view when the Apple Pay is being initialized */
  loadingView?: React.ReactNode;
  /** Placeholder view when Apple Pay is not available */
  unavailableView?: React.ReactNode;
}

/**
 * Renders an Apple Pay button to use in the Square Payment Form, pre-styled to meet Apple's Human Interface Guidelines.
 */
class ApplePayButton extends React.Component<ApplePayButtonProps> {
  render() {
    return (
      <ContextConsumer>
        {context =>
          <div>
            <button
              id={`${context.formId}-sq-apple-pay`}
              className="sq-apple-pay"
              style={{ display: context.applePayState === 'ready' ? 'block' : 'none' }}
            />
            {context.applePayState === 'loading' && this.props.loadingView}
            {context.applePayState === 'unavailable' && this.props.unavailableView}
          </div>
        }
      </ContextConsumer>
    )
  }
}

export default ApplePayButton