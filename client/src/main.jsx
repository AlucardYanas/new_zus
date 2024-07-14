// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.min.js';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

const clientId = '871175846359-8h0q9hgodff5f2dprng5o9i671hlcq0k.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>,
);
