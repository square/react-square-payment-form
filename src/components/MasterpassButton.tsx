import * as React from 'react'
import { ContextConsumer } from './Context'

export interface MasterpassButtonProps {
  /** Placeholder view when the Masterpass is being initialized */
  loadingView?: React.ReactNode
  /** Placeholder view when Masterpass is not available */
  unavailableView?: React.ReactNode
}

/**
 * Renders a Masterpass button to use in the Square Payment Form, pre-styled to meet Masterpass's branding guidelines.
 */
class MasterpassButton extends React.Component<MasterpassButtonProps> {
  render(): React.ReactElement {
    return (
      <ContextConsumer>
        {context => (
          <div>
            <button
              id={`${context.formId}-sq-masterpass`}
              className="sq-masterpass"
              style={{ display: context.masterpassState === 'ready' ? 'block' : 'none' }}
            />
            {context.masterpassState === 'loading' && this.props.loadingView}
            {context.masterpassState === 'unavailable' && this.props.unavailableView}
          </div>
        )}
      </ContextConsumer>
    )
  }
}

export default MasterpassButton
