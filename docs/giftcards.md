---
id: giftcards
title: Accepting Gift Cards
---
Accept gift cards using the Square Payment Form.

https://developer.squareup.com/docs/payment-form/gift-cards/part-1

> **Important**: If you are adding Gift Cards to a payment page that already uses an instance of the Square Payment Form for credit cards, you **must** initialize a second Square Payment Form for the gift cards. How to [Render Multiple Payment Forms](customization.md#render-multiple-payment-forms)

## Prerequisites

Follow steps 1-5 of the [Payment Form Setup Guide](paymentform.md) before continuing.

## 6. Add the gift card fields

```
import { GiftCardInput, CreditCardSubmitButton } from 'react-square-payment-form';

<SquarePaymentForm {...props}>
  <GiftCardInput />
  <CreditCardSubmitButton>
    Pay with Gift Card
  </CreditCardSubmitButton>
</SquarePaymentForm>
```

### 7. Update the callback function

[Modify the `cardNonceResponseReceived` callback](https://developer.squareup.com/docs/payment-form/gift-cards/part-1#step-3-initialize-the-gift-card-payment-form) to handle your gift card logic and [send the nonce to your backend](https://developer.squareup.com/docs/payment-form/gift-cards/part-1#step-5-post-the-nonce-to-your-backend).


### 8. Generate a nonce

You can use the [Gift Card test card](https://developer.squareup.com/docs/testing/test-values#card-present-success-state-values) in Sandbox to verify that the form is generating a nonce.