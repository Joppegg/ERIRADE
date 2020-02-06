import React from 'react';

import SnippetHolder from './SnippetHolder';
import MenuBar from './MenuBar';
function MainView({employeeId}) {
    return (
         <div className="column-layout">
         <SnippetHolder employeeId={employeeId}/>
        </div>
    );
}

export default MainView;    