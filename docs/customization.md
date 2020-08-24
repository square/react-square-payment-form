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

## Change the default placeholders

To change the default placeholders, you can pass the following props to the `SquarePaymentForm`:
```
<SquarePaymentForm
  placeholderCVV={'test1'}
  placeholderPostal={'test2'}
  placeholderCreditCard={'test3'}
  placeholderExpiration={'test4'}
  placeholderGiftCard{'test5'}
>
```

## Set postal code on load

Use the `postalCode` callback to set the postal code value for the convenience of the buyer, using information previously entered (for example, from a billing address).

```
const PaymentPage = () => {
  function postalCode() {
    const postalCode = '12345'; // your logic here
    return postalCode;
  }

  return (
    <SquarePaymentForm
      postalCode={postalCode}
    />
  )
}
```

## Focus element on load

Use the `focusField` callback to set the input focus on a particular input field.

```
const PaymentPage = () => {
  function focusField() {
    return 'cardNumber';
  }

  return (
    <SquarePaymentForm
      focusField={focusField}
    />
  )
}
```

## Control when the nonce is requested

Instead of using the `CreditCardSubmitButton`, you can hook directly into the `Context` component to have more control over when the form is submitted. The `useContext` call **must** be used within the `<SquarePaymentForm />` component.

```
import React, { useContext } from 'react';
import { Context } from 'react-square-payment-form';

const MyCustomButton = () => {
 const context = useContext(Context);

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('extra validations');
    context.onCreateNonce();
  }

  return (
    <button onClick={handleSubmit}>Pay</button>
  );
}

const PaymentPage = () => {
  return (
    <SquarePaymentForm {...props}>
      <MyCustomButton />
    </SquarePaymentForm>
  );
}

```

## Render multiple payment forms

Each payment form requires a unique form ID. By default, the form ID is `sq-payment-form`.

```
<SquarePaymentForm formId={"form-id-1}" />
<SquarePaymentForm formId={"form-id-2}" />
```

## Can't find what you need?

If the React payment form does not fit your use case, please leave us feedback on our [GitHub](https://github.com/square/react-square-payment-form/issues) or our [community Slack](https://squ.re/2Hks3YE). Feel free to contribute to our repository as well!
