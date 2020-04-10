---
id: production
title: Taking payments in production
---

Take a payment in production

## Prerequisites

In order to take a payment in production, the following must be true:
* You have followed the steps of the [Payment Form Setup Guide](paymentform.md) and can successfully create a nonce.
* You have followed the steps to [Create a Payment](payments.md) and can successfully create a payment.


## 1. Use your production credentials

If you are ready to use the payment form in production, you will need to do the following:
1. Remove the `sandbox` flag from the props.
1. Replace all your Sandbox credentials with production credentials
    1. Open your [Application Dashboard](https://developer.squareup.com/apps).
    1. Click on the application you want to use for the payment form.
    1. On the top, toggle to "Production".
    1. Replace the following credentials with your **production** credentials:
        1. Application ID
        1. Location ID
        1. Access token
1. Replace your backend payments URL from https://connect.squareupsandbox.com/v2/payments to https://connect.squareup.com/v2/payments
