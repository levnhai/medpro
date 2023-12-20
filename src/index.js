import React from 'react';
import ReactDOM from 'react-dom/client';
import Store from './redux/store';
import { Provider } from 'react-redux';
import GlobalStyles from '~/components/GlobalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
