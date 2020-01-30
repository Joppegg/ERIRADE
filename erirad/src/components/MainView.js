import React from 'react';
import SideView from './SideView';
import ReportSubmit from './ReportSubmit';
import SnippetHolder from './SnippetHolder';

function MainView(props) {
    return (
         <div className="column-layout">
         <SnippetHolder/>
        </div>
    );
}

export default MainView;