/* eslint-disable unicorn/filename-case */
import React, { useContext } from 'react';

import Context from './Context';

interface Props {
  /** Input field label */
  label?: string;
}

/**
 * Renders a placeholder element for the CVV code. The SqPaymentForm JS library will replace this element with
 * a secure `<iframe>` tag that will render an `<input>` field for the CVV code.
 *
 * When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
 */
export const CreditCardCVVInput: React.FC<Props> = (props: Props) => {
  const context = useContext(Context);
  return (
    <div>
      {props.label && <span className="sq-label">{props.label}</span>}
      <div id={`${context.formId}-sq-cvv`}></div>
    </div>
  );
};

CreditCardCVVInput.defaultProps = {
  label: 'CVV',
};
/* eslint-enable unicorn/filename-case */
