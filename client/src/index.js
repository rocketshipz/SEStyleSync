import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure this path is correct for your CSS
import App from './App'; // This is the main component containing your Router
import reportWebVitals from './reportWebVitals'; // Keep this if you use web-vitals

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Ensure your App component is rendered here, as it contains the Router */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
