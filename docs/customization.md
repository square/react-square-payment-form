---
id: customization
title: Customizing the Form
---

This pages covers some more advanced customizations that are available.

## Change the default styles

If you would like to update the styles for the input fields, use the `inputStyles` prop for the `SquarePaymentForm`.

You can use the following class names to change other default component styles:

| Class Name      | Description                |
| --------------- | -------------------------- |
| `sq-apple-pay`  | Apple Pay button           |
| `sq-creditcard` | Credit card submit button  |
| `sq-google-pay` | Google Pay button          |
| `sq-label`      | Label for the input fields |
| `sq-masterpass` | Masterpass button          |

## Control when the nonce is requested

Instead of using the `CreditCardSbumitButton`, you can hook directly into the `Context` component to have more control over when form is submitted.

```
import React, { useContext } from 'react';
import { Context } from 'react-square-payment-form';

const PaymentPage = () => {
  const context = useContext(Context);

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('extra validations');
    context.onCreateNonce();
  }

  return (
    <SquarePaymentForm>
      <button onClick={handleSubmit}>Pay</button>
    </SquarePaymentForm>
  );
}

```

## Can't find what you need?

If the React payment form does not fit your use case, please leave us feedback on our [GitHub](https://github.com/square/react-square-payment-form/issues) or our [community Slack](https://squ.re/2Hks3YE). Feel free to contribute to our repository as well!
