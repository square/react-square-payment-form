# react-square-payment-form

The React Square Payment Form lets you take payments securely and easily
in your React app using a familiar, component-based syntax.

*Note: this SDK is in beta. We'll be improving it as we work towards GA - please
leave feedback for our team!*

## Compatability

React 16.3.0 or above

## Installation

See the [documentation](https://square.github.io/react-square-payment-form) to get started.

## Demo

1. Run the demo locally
    ```
    cd demo
    npm install
    npm start
    ```
1. Update the `LOCATION_ID` and `APPLICATION_ID` in `PaymentPage.jsx` with your own application credentials

*Note: The demo only supports credit card payments. Digital wallets are not supported locally.*

## Website

### Running the website locally

```
cd website
npm install
npm start
```

### Updating the documentation

Files under `docs/components` are automatically generated from the component comments. All other documentation can be modified directly.

To update the component documentation:

1. Comment out the lines 5-12 and line 70 from `src/components/SquarePaymentForm.tsx`. The parser currently doesn't understand some of the syntax used.
1. Run the script to automatically generate the documents
    ```
    ./buildDocs.sh
    ```
1. Uncomment the lines from step 1


### Publishing to GitHub Pages

Once the changes are merged, run the following command to publish the website.

```
cd website
GIT_USER=<GIT_USER> CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

## License

```
Copyright 2019 Square, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```