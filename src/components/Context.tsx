import * as React from 'react';
import { SqVerificationDetails, SqError, SqVerificationResult } from './models';

export interface ContextInterface {
  /** Unique form ID */
  formId?: string;
  /** Apple pay state*/
  applePayState?: 'loading' | 'unavailable' | 'ready';
  /** Google pay state*/
  googlePayState?: 'loading' | 'unavailable' | 'ready';
  /** Masterpass state */
  masterpassState?: 'loading' | 'unavailable' | 'ready';
  /** Function that is called to create a nonce */
  onCreateNonce?: (event: React.MouseEvent) => void;
  /** Function that is called to verify the buyer */
  onVerifyBuyer?: (
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: [SqError], verificationResult: SqVerificationResult) => void
  ) => void;
}

/**
 * Internal helper that the `SquarePaymentForm` uses to manage internal state and expose access to the SqPaymentForm library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
const Context = React.createContext({
  applePayState: 'loading',
  googlePayState: 'loading',
  masterpassState: 'loading',
  formId: '',
  onCreateNonce: (event: React.MouseEvent) => {},
  onVerifyBuyer: (
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: [SqError], verificationResult: SqVerificationResult) => void
  ) => {},
});
/* eslint-enable @typescript-eslint/no-unused-vars */

export default Context;
