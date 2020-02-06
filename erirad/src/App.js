import React, {useState} from 'react';
import './css/Header.css';
import LoginView from './components/LoginView'

import ComponentRouter from './components/ComponentRouter';
import Header from './components/Header'
import Footer from './components/Footer'

//This handles rendering of the component router (the "Main application") based on successful login authentication
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
        <div>
        <Header/>
        <LoginView onLogIn={handleLogin} onEmployeeLogin={handleEmployeeId}/>   
        </div>  
      }
      </div>

  );
}

export default App;
