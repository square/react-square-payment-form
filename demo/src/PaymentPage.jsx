import React, { useState } from 'react';
import {
  SquarePaymentForm,
  ApplePayButton,
  CreditCardCVVInput,
  CreditCardExpirationDateInput,
  CreditCardNumberInput,
  CreditCardPostalCodeInput,
  CreditCardSubmitButton,
  GooglePayButton,
  MasterpassButton,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';

const APPLICATION_ID = 'REPLACE-ME';
const LOCATION_ID = 'REPLACE-ME';

const PaymentPage = () => {
  const [errorMessages, setErrorMessages] = useState([]);

  function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
    if (errors) {
      setErrorMessages(errors.map(error => error.message));
      return;
    }

    setErrorMessages([]);

    alert('nonce created: ' + nonce + ', buyerVerificationToken: ' + buyerVerificationToken);
    // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
  }

  function createPaymentRequest() {
    return {
      requestShippingAddress: false,
      requestBillingInfo: true,
      currencyCode: 'USD',
      countryCode: 'US',
      total: {
        label: 'MERCHANT NAME',
        amount: '1',
        pending: false,
      },
      lineItems: [
        {
          label: 'Subtotal',
          amount: '1',
          pending: false,
        },
      ],
    };
  }

  function createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: 'USD',
      intent: 'CHARGE',
      billingContact: {
        familyName: 'Smith',
        givenName: 'John',
        email: 'jsmith@example.com',
        country: 'GB',
        city: 'London',
        addressLines: ["1235 Emperor's Gate"],
        postalCode: 'SW7 4JA',
        phone: '020 7946 0532',
      },
    };
  }

  const loadingView = <div className="sq-wallet-loading"></div>;
  const unavailableApple = (
    <div className="sq-wallet-unavailable">Apple pay unavailable. Open safari on desktop or mobile to use.</div>
  );
  const unavailableGoogle = <div className="sq-wallet-unavailable">Google pay unavailable.</div>;
  const unavailableMasterpass = <div className="sq-wallet-unavailable">Masterpass unavailable.</div>;

  return (
    <SquarePaymentForm
      sandbox={true}
      applicationId={APPLICATION_ID}
      locationId={LOCATION_ID}
      cardNonceResponseReceived={cardNonceResponseReceived}
      createPaymentRequest={createPaymentRequest}
      createVerificationDetails={createVerificationDetails}
    >
      <ApplePayButton loadingView={loadingView} unavailableView={unavailableApple} />
      <GooglePayButton loadingView={loadingView} unavailableView={unavailableGoogle} />
      <MasterpassButton loadingView={loadingView} unavailableView={unavailableMasterpass} />

      <div className="sq-divider">
        <span className="sq-divider-label">Or</span>
        <hr className="sq-divider-hr" />
      </div>

      <fieldset className="sq-fieldset">
        <CreditCardNumberInput />

        <div className="sq-form-third">
          <CreditCardExpirationDateInput />
        </div>

        <div className="sq-form-third">
          <CreditCardPostalCodeInput />
        </div>

        <div className="sq-form-third">
          <CreditCardCVVInput />
        </div>
      </fieldset>

      <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>

      <div className="sq-error-message">
        {errorMessages.map(errorMessage => (
          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
        ))}
      </div>
    </SquarePaymentForm>
  );
};

export default PaymentPage;
