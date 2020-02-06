import React from 'react';
import '../css/Header.css';
import Header from './Header'
import MainView from './MainView';
import Footer from './Footer';

function ReportView({employeeId}) {
    return (
        <div className="App">
            
            <MainView employeeId={employeeId} />
          
        </div>
    );
}

export default ReportView;