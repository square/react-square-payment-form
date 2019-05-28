import * as React from 'react'

const Context = React.createContext({
  applePayState: 'loading',
  googlePayState: 'loading',
  masterpassState: 'loading',
  formId: '',
  onCreateNonce: (event: React.MouseEvent) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const ContextProvider = Context.Provider
export const ContextConsumer = Context.Consumer