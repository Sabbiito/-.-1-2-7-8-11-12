import React from 'react';
import AppRouter from './router/AppRouter';
import CookieConsentBanner from './components/common/CookieConsentBanner';

function App() {
  return (
    <>
      <AppRouter />
      <CookieConsentBanner />
    </>
  );
}

export default App;