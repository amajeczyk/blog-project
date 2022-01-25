import React from 'react';
import './App.css';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import NavBar from './components/NavBar';

function App() {
  return (
  <div className='main-wrapper'>
    <NavBar/>
    <MainContent/>
    <Footer />
  </div>)
}

export default App;
