import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ReportView from './ReportView';
import Header from './Header';
import Footer from './Footer';
import UserHomePage from './UserHomePage';
function ComponentRouter(props) {
    return (
        <div>
           <Header/>
            <Router >
                <Switch>
                    <Route exact path="/" component={ReportView} />
                </Switch>  
                <Switch>
                    <Route exact path="/home" component={UserHomePage} />
                </Switch>  
            </Router>
            <Footer />
        </div>
    );
}




export default ComponentRouter;