import React from 'react';
import IncomingReportRequest from './IncomingReportRequest';
function HomePage(props) {
    return (

        <div className="snippetContainer">
            <div className="homepageContainer">
                <h2>Welcome to the homepage</h2>
                <p>This page will be the entrypoint to the reporting system. Here you will be able to create a request for a report
                    as well as responding to requests. 
                </p>

                <div className="homepageRow">
                <IncomingReportRequest/>

                </div>
            </div>
        </div>

    );
}

export default HomePage;