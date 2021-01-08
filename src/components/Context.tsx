/* eslint-disable import/group-exports, filenames/match-exported, no-unused-vars */
import * as React from 'react';

import { SqVerificationDetails, SqError, SqVerificationResult } from './models';

export interface ContextInterface {
  /** Apple pay state*/
  applePayState?: 'loading' | 'unavailable' | 'ready';
  /** Unique form ID */
  formId?: string;
  /** Google pay state*/
  googlePayState?: 'loading' | 'unavailable' | 'ready';
  /** Masterpass state */
  masterpassState?: 'loading' | 'unavailable' | 'ready';
  /* SquarePaymentForm state */
  ready?: boolean;
  /** Function that is called to create a nonce */
  onCreateNonce?: () => void;
  /** Function that is called to verify the buyer */
  onVerifyBuyer?: (
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: SqError, verificationResult: SqVerificationResult) => void
  ) => void;
}

/**
 * Internal helper that the `SquarePaymentForm` uses to manage internal state and expose access to the SqPaymentForm library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
export const Context = React.createContext({
  applePayState: 'loading',
  formId: '',
  googlePayState: 'loading',
  masterpassState: 'loading',
  ready: false,
  onCreateNonce: () => {},
  onVerifyBuyer: (
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: SqError, verificationResult: SqVerificationResult) => void
  ) => {},
});

export default Context;
/* eslint-enable import/group-exports, filenames/match-exported, no-unused-vars */
