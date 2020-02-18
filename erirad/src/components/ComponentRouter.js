import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import ReportView from './ReportView';
import Header from './Header';
import Footer from './Footer';
import SearchReportView from './SearchReportView';
import MenuBar from './MenuBar';
import HomePage from './HomePage';
import AuthorReports from './AuthorReports';
import CreateReportRequest from './CreateReportRequest';
import SentRequests from './SentRequests';
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
                    <Route exact path="/search" component={SearchReportView} />
                </Switch>
                <Switch>
                    <Route exact path="/report"
                        component={() => <ReportView employeeId={employeeId} />}
                    />
                </Switch>
                <Switch>
                    <Route exact path="/author"
                    component={() => <AuthorReports/>}
                    />

                </Switch>
                <Switch>
                    <Route exact path="/createreport"
                    component={() => <CreateReportRequest/>}
                    />
                </Switch>

                <Switch>
                    <Route exact path="/sentrequests"
                    component={() => <SentRequests/>}
                    />
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}




export default ComponentRouter;