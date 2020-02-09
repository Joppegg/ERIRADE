import React from 'react';
import '../css/Header.css';
import MainView from './MainView';


function ReportView({employeeId}) {
    return (
        <div className="App">
            
            <MainView employeeId={employeeId} />
          
        </div>
    );
}

export default ReportView;