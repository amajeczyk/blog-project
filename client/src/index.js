import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  //deleted Recat stric mode because it called constructor twice
  <BrowserRouter>               
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);


