const siteConfig = {
  title: 'React Square Payment Form',
  tagline: 'Take payments securely and easily in your React App with Square',
  baseUrl: '/react-square-payment-form/',
  projectName: 'react-square-payment-form',
  organizationName: 'square',
  url: 'https://square.github.io/react-square-payment-form',
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {href: 'https://docs.connect.squareup.com/api/connect/v2', label: 'API'},
    {href: 'https://github.com/square/react-square-payment-form', label: 'Github'},
  ],
  colors: {
    primaryColor: '#229bac',
    secondaryColor: '#176c78',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Square Inc.`,
  highlight: {
    theme: 'default',
  },
  onPageNav: 'separate',
  cleanUrl: true,
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  noIndex: true,
};

module.exports = siteConfig;
