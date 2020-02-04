import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
//This function will serve as the main view when the user is logged in
function UserHomePage(props) {

    const [employeeId, setEmployeeId] = useState(0);

    return (
         <div className="snippetContainer">
         <Link to="/">Your report view</Link>
        </div>
    );
}

export default UserHomePage;