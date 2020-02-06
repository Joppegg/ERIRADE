import React from 'react';

import SnippetHolder from './SnippetHolder';
import MenuBar from './MenuBar';
function MainView(props) {
    return (
         <div className="column-layout">
         <SnippetHolder/>
        </div>
    );
}

export default MainView;    