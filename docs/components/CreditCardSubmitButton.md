---
id:CreditCardSubmitButton
title:CreditCardSubmitButton
---

Renders a button that will create a card nonce using Square's SqPaymentForm JS library and calls
`onCardNonceResponseReceived` afterwards.

When accepting credit card payments, you **must** have this component inside your `SquarePaymentForm`.

## Props

| Name     | Type            | Description         | Default Value |
| -------- | --------------- | ------------------- | ------------- |
| children | React.ReactNode | children components |               |
| disabled | Boolean         | disable button      | false         |
