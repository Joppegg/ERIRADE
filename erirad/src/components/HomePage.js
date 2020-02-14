import React from 'react';
import IncomingReportRequest from './IncomingReportRequest';
function HomePage(props) {
    return (

        <div className="snippetContainer">
            <div className="overViewHomePage">
                <div className="overViewHomePageColumn">
                    <h2>Welcome to the homepage</h2>
                    <p>This page will be the entrypoint to the reporting system. Here you will be able to create a request for a report
                        as well as responding to requests.
                </p>
                </div>
                <div className="homePageIncomingRequests">
                   <h2>Play a Game?</h2>
                </div>
                <div className="homePageIncomingRequests">
                    <h2>Your pending reports</h2>
                    <IncomingReportRequest />
                </div>
            </div>
        </div>

    );
}

export default HomePage;