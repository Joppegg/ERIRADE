import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TagSelector from './TagSelector';


//This function will serve as the main view when the user is logged in
function UserHomePage(props) {

    const [employeeId, setEmployeeId] = useState(0);

    return (
        <div className="snippetContainer">
            <div className="homepageContainer">
                <div className="homepageRow">
                       <Link to="/report">Your report view</Link>
                </div>

                <div className="homepageRow">
                       <h2>Filter on what kind of information you would like to see here!</h2>
                </div>
                <div className="homepageRow">
                       <TagSelector/>
                </div>

            </div>
        </div>
    );
}

export default UserHomePage;