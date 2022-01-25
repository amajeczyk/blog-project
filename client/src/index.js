import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  //deleted Recat stric mode because it called constructor twice
  <>                
    <App />
  </>,
  document.getElementById('root')
);


