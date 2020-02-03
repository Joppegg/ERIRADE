import React from 'react';
import './css/Header.css';
import Header from './components/Header'
import MainView from './components/MainView';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header/>
      <MainView/>
      <Footer/>
    </div>
  );
}

export default App;
