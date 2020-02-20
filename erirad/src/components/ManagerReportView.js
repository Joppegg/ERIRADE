import React from 'react';

function ManagerReportView(props) {
    return (
        <div className="ManagerReportContainer">
            <div className="overViewManagerViewReport">
                <h2>Big reportWindow over here, where you can merge reports from the right.</h2>
            </div>
            <div className="overViewManagerViewSideBar">
                <h2>Checkbox list of all the reportees.</h2>
            </div>
        </div>
    );
}

export default ManagerReportView;