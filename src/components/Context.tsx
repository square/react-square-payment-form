import * as React from 'react'
import { SqVerificationDetails, SqError, SqVerificationResult } from './models';

export interface ContextInterface {
  formId?: string;
  applePayState?: string;
  googlePayState?: string;
  masterpassState?: string;
  onCreateNonce?: (event: React.MouseEvent) => {};
  onVerifyBuyer?: (source: string, verificationDetails: SqVerificationDetails, callback: ((err: [SqError], verificationResult: SqVerificationResult) => void)) => void;
}
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
    callback: ((err: [SqError], verificationResult: SqVerificationResult) => void)
  ) => {}
})
/* eslint-enable @typescript-eslint/no-unused-vars */

export const ContextProvider = Context.Provider
export const ContextConsumer = Context.Consumer