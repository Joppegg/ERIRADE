import React from 'react';
import '../css/Header.css';
import Header from './Header'
import MainView from './MainView';
import Footer from './Footer';

function ReportView(props) {
    return (
        <div className="App">
            
            <MainView />
            <Footer />
        </div>
    );
}

export default ReportView;