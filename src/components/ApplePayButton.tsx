import React, { useContext } from 'react';

import Context from './Context';

interface Props {
  /** Placeholder view when the Apple Pay is being initialized */
  loadingView?: React.ReactNode;
  /** Placeholder view when Apple Pay is not available */
  unavailableView?: React.ReactNode;
}

/**
 * Renders an Apple Pay button to use in the Square Payment Form, pre-styled to meet Apple's Human Interface Guidelines.
 */
export const ApplePayButton: React.FC<Props> = (props: Props) => {
  const context = useContext(Context);
  return (
    <div>
      <button
        id={`${context.formId}-sq-apple-pay`}
        className="sq-apple-pay"
        style={{ display: context.applePayState === 'ready' ? 'block' : 'none' }}
      />
      {context.applePayState === 'loading' && props.loadingView}
      {context.applePayState === 'unavailable' && props.unavailableView}
    </div>
  );
};
