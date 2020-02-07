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
import MenuBar from './MenuBar';
import HomePage from './HomePage';
function ComponentRouter({ employeeId }) {
    return (
        <div>

            <Router >
                <Header />
                <MenuBar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
                <Switch>
                    <Route exact path="/search" component={UserHomePage} />
                </Switch>
                <Switch>
                    <Route exact path="/report"

                        component={() => <ReportView employeeId={employeeId} />}

                    />
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}




export default ComponentRouter;