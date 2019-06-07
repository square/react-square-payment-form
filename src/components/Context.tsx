import * as React from 'react'

export interface ContextInterface {
  formId?: string;
  applePayState?: string;
  googlePayState?: string;
  masterpassState?: string;
  onCreateNonce?: (event: React.MouseEvent) => {};
}

const Context = React.createContext({
  applePayState: 'loading',
  googlePayState: 'loading',
  masterpassState: 'loading',
  formId: '',
  onCreateNonce: (event: React.MouseEvent) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const ContextProvider = Context.Provider
export const ContextConsumer = Context.Consumer