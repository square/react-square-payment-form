import React, { useContext } from 'react';

import Context from './Context';

interface Props {
  /** Placeholder view when the Masterpass is being initialized */
  loadingView?: React.ReactNode;
  /** Placeholder view when Masterpass is not available */
  unavailableView?: React.ReactNode;
}

/**
 * Renders a Masterpass button to use in the Square Payment Form, pre-styled to meet Masterpass's branding guidelines.
 */
export const MasterpassButton: React.FC<Props> = (props: Props) => {
  const context = useContext(Context);
  return (
    <div>
      <button
        id={`${context.formId}-sq-masterpass`}
        className="sq-masterpass"
        style={{ display: context.masterpassState === 'ready' ? 'block' : 'none' }}
      />
      {context.masterpassState === 'loading' && props.loadingView}
      {context.masterpassState === 'unavailable' && props.unavailableView}
    </div>
  );
};
