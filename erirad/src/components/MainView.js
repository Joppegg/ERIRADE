import React from 'react';

import SnippetHolder from './SnippetHolder';

function MainView({employeeId}) {
    return (
         <div className="column-layout">
         <SnippetHolder employeeId={employeeId}/>
        </div>
    );
}

export default MainView;    