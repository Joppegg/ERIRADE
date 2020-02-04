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
function ComponentRouter(props) {
    return (
        <div>
           <Header/>
            <Router >
                <Switch>
                    <Route exact path="/" component={ReportView} />
                </Switch>  
            </Router>
            <Footer />
        </div>
    );
}




export default ComponentRouter;