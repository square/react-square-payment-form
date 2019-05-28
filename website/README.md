## Website

The website is hosted on GitHub pages.

### Run the website locally

```
cd react-square-payment-form/website
npm install
npm start
```

### Publishing to GitHub Pages
```
cd react-square-payment-form/website
GIT_USER=<GIT_USER> CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

### Automatically generating the component documentation
```
cd react-square-payment-form
./buildDocs.sh
```
You will need to comment out some code in `SquarePaymentForm.tsx` to get this to work. The parser doesn't understand some of the syntax used.
