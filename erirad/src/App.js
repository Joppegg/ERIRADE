import React, {useState} from 'react';
import './css/Header.css';
import LoginView from './components/LoginView'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReportView from './components/ReportView';
import ComponentRouter from './components/ComponentRouter';

function App() {

  
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [employeeId, setemployeeId] = useState(null)

const handleLogin = () => {
  setIsLoggedIn(true)
}

const handleEmployeeId = (id) => {
  setemployeeId(id) 
}

  return (
     <div className="App">
      {
        isLoggedIn ?
        <ComponentRouter/>
        :
        <LoginView onLogIn={handleLogin} onEmployeeLogin={handleEmployeeId}/>
      }
      </div>

  );
}

export default App;
