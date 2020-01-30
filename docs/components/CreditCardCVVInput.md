---
id:CreditCardCVVInput
title:CreditCardCVVInput
---
Renders a placeholder element for the CVV code. The SqPaymentForm JS library will replace this element with
a secure `<iframe>` tag that will render an `<input>` field for the CVV code.

When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.
## Props
|Name|Type|Description|Default Value|
|---|---|---|---|
|label|string|Input field label|`'CVV'`|