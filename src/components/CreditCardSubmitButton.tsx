import React, { useContext } from 'react';

import Context from './Context';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Renders a button that will create a card nonce using Square's SqPaymentForm JS library and calls
 * `onCardNonceResponseReceived` afterwards.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
export const CreditCardSubmitButton: React.FC<Props> = (props: Props) => {
  const context = useContext(Context);
  return (
    <button disabled={props.disabled} className="sq-creditcard" onClick={context.onCreateNonce}>
      {props.children ? props.children : 'Pay'}
    </button>
  );
};

CreditCardSubmitButton.defaultProps = {
  disabled: false,
};
