import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './views/homepage/HomePage';
import reportWebVitals from './reportWebVitals';
import { CtxBookmarksProvider } from './contextAPI/bookmark-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // disabled React.StrictMode because we have a setInterval on dispatch and unless this code run in production,
  // React intentionnally calls reducer twice to make any unexpected side effects more apparent.
  // To keep the StrictMode active, we could check the environment then divide the *60 secs by 2 in the bookmark-context.ts file for other environments than production
  // <React.StrictMode>
  <CtxBookmarksProvider>
    <HomePage />
  </CtxBookmarksProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
