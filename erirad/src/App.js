import React, {useState, useEffect} from 'react';
import './css/Header.css';
import LoginView from './components/LoginView'

import ComponentRouter from './components/ComponentRouter';
import Header from './components/Header'
import Footer from './components/Footer'

//This handles rendering of the component router (the "Main application") based on successful login authentication
function App() {

  
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [employeeId, setemployeeId] = useState(null)

const [employee, setEmployee] = useState({
  employeeID: '',
  firstName: '',
  lastName: ''
})


const handleEmployeeId = (data) => {
  setemployeeId(data.employeeId) 

  setEmployee({
    employeeId: data.employeeId,
    firstName: data.firstName,
    lastName: data.lastName
  })
}

useEffect(() => {
  console.log("eid")
  console.log(employeeId)
  if(employeeId != null){
    setIsLoggedIn(true)
  }
 
}, [employeeId])

useEffect(() => {
  console.log("employee")
  console.log(employee)
}, [employee])

const EmployeeContext = React.createContext(employeeId);


  return (
     <div className="App">
      {
        isLoggedIn ?
        <ComponentRouter employeeId={employeeId}/>
        :
        <div>
        <Header/>
        <LoginView onEmployeeLogin={handleEmployeeId}/>   
        </div>  
      }
      </div>

  );
}

export default App;
