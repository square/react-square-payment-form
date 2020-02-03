import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import MockContext from './__mocks__/MockContext';

let mockContext = MockContext;

const verificationDetails = {
  amount: '100.00',
  storeCard: 'charge',
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

const FakeApp: React.FunctionComponent = () => {
  const context = mockContext;
  return (
    <div>
      <div id="test-create-nonce" onClick={context.onCreateNonce} />
      <div
        id="test-verify-buyer"
        onClick={() => {
          context.onVerifyBuyer('nonce', verificationDetails, jest.fn());
        }}
      />
    </div>
  );
};

describe('Context', () => {
  it('should be able to programmatically call onVerifyBuyer', () => {
    const wrapper = mount(<FakeApp />);
    wrapper.find('#test-verify-buyer').simulate('click');
    expect(mockContext.onVerifyBuyer.mock.calls.length).to.eql(1);
  });

  it('should be able to programmatically call onCreateNonce', () => {
    const wrapper = mount(<FakeApp />);
    wrapper.find('#test-create-nonce').simulate('click');
    expect(mockContext.onCreateNonce.mock.calls.length).to.eql(1);
  });
});
