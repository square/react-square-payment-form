---
id: charging
title: Creating a Charge
---

Create a charge from your backend in Sandbox using the nonce created from the `SquarePaymentForm`.

## Prerequisites

In order to generate a charge on a payment method, the following must be true:
* You have followed the steps of the [Payment Form Setup Guide](paymentform.md) and can successfully create a nonce.

## 1. Set up a backend endpoint

In this example, we will use a Ruby on Rails backend for payment processing.

```ruby
class PaymentsController < ApplicationController
  # endpoint: POST /payments
  def create
  end
end
```

## 2. Send the nonce to your backend

Send the nonce created from `cardNonceResponseReceived` to your backeend.

```
class PaymentPage extends React.Component {

  cardNonceResponseReceived = (errors, nonce, cardData) => {
    ...
    alert("nonce created: " + nonce)
    API.post('/payments', data: { nonce: nonce }) // implement this
  }
}
```
## 3. Get your API access token

To get your API access token:
1. Open your [Application Dashboard](https://connect.squareup.com/apps).
2. Click on the application you want to use for the payment form.
3. Click on the "Show" link on the **Sandbox Access Token** and copy it.

## 4. Take a payment

On your backend, take this nonce and create a charge using Square's Transactions API. You can read the [Transactions API Setup Guide](https://docs.connect.squareup.com/payments/transactions/setup) to learn how to create a charge.

```
def create
  payload = {
    "card_nonce": params[:nonce],
    "amount_money": { # amount_money = $1.00
      "amount": 100,
      "currency" "USD"
    },
    "idempotency_key": SecureRandom.uuid
  }
  url = "https://connect.squareupsandbox.com/v2/locations/{SANDBOX_LOCATION_ID}/transactions"
  res = HTTP.auth("Bearer #{SANDBOX_ACCESS_TOKEN}").post(url, :body => payload.to_json)
  render json: res.body
end
```

The [idempotency key](https://docs.connect.squareup.com/basics/api101/idempotency) should be generated as a UUID by the backend payment page.
