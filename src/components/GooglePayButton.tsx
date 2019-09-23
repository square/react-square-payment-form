import * as React from 'react'
import { ContextConsumer } from './Context'

export interface GooglePayButtonProps {
  /** Placeholder view when the Google Pay is being initialized */
  loadingView?: React.ReactNode
  /** Placeholder view when Google Pay is not available */
  unavailableView?: React.ReactNode
}
/**
 * Renders a Google Pay button to use in the Square Payment Form, pre-styled to meet Google's branding guidelines.
 */
class GooglePayButton extends React.Component<GooglePayButtonProps> {
  render(): React.ReactElement {
    return (
      <ContextConsumer>
        {context => (
          <div>
            <button
              id={`${context.formId}-sq-google-pay`}
              className="sq-google-pay"
              style={{ display: context.googlePayState === 'ready' ? 'block' : 'none' }}
            />
            {context.googlePayState === 'loading' && this.props.loadingView}
            {context.googlePayState === 'unavailable' && this.props.unavailableView}
          </div>
        )}
      </ContextConsumer>
    )
  }
}

export default GooglePayButton
