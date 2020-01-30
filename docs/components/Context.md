---
id:Context
title:Context
---
Internal helper that the `SquarePaymentForm` uses to manage internal state and expose access to the SqPaymentForm library.

This is available for developers who require more customization over their payment form implementation. Please refer to the
[customization](customization.md) page for usage details.

## Props
|Name|Type|Description|Default Value|
|---|---|---|---|
|applePayState|string|Apple pay state (loading, unavailable, ready)||
|formId|string|Unique form ID||
|googlePayState|string|Google pay state (loading, unavailable, ready)||
|masterpassState|string|Masterpass state (loading, unavailable, ready)||
|onCreateNonce|(event: MouseEvent) => void|Function that is called to create a nonce||
|onVerifyBuyer|(source: string, verificationDetails: SqVerificationDetails, callback: ({}: {}) => {}) => void|Function that is called to verify the buyer||