import React from 'react';
import SideView from './SideView';
import ReportSubmit from './ReportSubmit';

function MainView(props) {
    return (
         <div className="column-layout">
         {/*<SideView/>*/}
         <ReportSubmit/>
        </div>
    );
}

export default MainView;