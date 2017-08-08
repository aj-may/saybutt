import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'whatwg-fetch';

fetch('https://saybutt.com/api/pranks/index.json')
  .then(response => response.json())
  .then((pranks) => {
    ReactDOM.render(
      <App pranks={pranks} />,
      document.getElementById('root'),
    );
  })
  .catch(console.error);
