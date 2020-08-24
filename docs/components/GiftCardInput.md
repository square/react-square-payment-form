---
id:GiftCardInput
title:GiftCardInput
---
Renders a placeholder element for the gift card number. The SqPaymentForm JS library will replace this
element with a secure `<iframe>` tag that will render an `<input>` field for the gift card number.

When accepting gift card payments, you **must** have this component inside your `SquarePaymentForm`.
## Props
|Name|Type|Description|Default Value|
|---|---|---|---|
|label|string|Input field label|`'Gift Card'`|