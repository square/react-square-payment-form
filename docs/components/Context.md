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
|applePayState|ready,unavailable,loading|Apple pay state||
|formId|string|Unique form ID||
|googlePayState|ready,unavailable,loading|Google pay state||
|masterpassState|ready,unavailable,loading|Masterpass state||
|onCreateNonce|() => void|Function that is called to create a nonce||
|onVerifyBuyer|(source: string, verificationDetails: SqVerificationDetails, callback: ({}: {}) => {}) => void|Function that is called to verify the buyer||