import React, { useContext } from 'react';

import Context from './Context';

interface Props {
  /** Placeholder view when the Google Pay is being initialized */
  loadingView?: React.ReactNode;
  /** Placeholder view when Google Pay is not available */
  unavailableView?: React.ReactNode;
}
/**
 * Renders a Google Pay button to use in the Square Payment Form, pre-styled to meet Google's branding guidelines.
 */
export const GooglePayButton: React.FC<Props> = (props: Props) => {
  const context = useContext(Context);
  return (
    <div>
      <button
        id={`${context.formId}-sq-google-pay`}
        className="sq-google-pay"
        style={{ display: context.googlePayState === 'ready' ? 'block' : 'none' }}
      />
      {context.googlePayState === 'loading' && props.loadingView}
      {context.googlePayState === 'unavailable' && props.unavailableView}
    </div>
  );
};
