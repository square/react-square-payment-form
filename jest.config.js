module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.(spec|test).(ts|tsx|js)'],
  // TODO: Functional components do not have an instance variable. Need to re-write this test
  testPathIgnorePatterns: ['SquarePaymentForm.test.tsx'],
  setupFiles: ['./setupTests.ts'],
};
