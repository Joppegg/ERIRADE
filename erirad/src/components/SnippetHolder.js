import React, { useState, useEffect } from 'react';
import '../css/Header.css'
import ReportSubmit from './ReportSubmit';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/
function SnippetHolder(props) {

    const [snippets, setSnippets] = useState([
        <ReportSubmit/>
    ]
    )

    const addSnippet = () => {
        const snippet = (
            <ReportSubmit />
        )
        setSnippets([...snippets, snippet])

        console.log(snippets)
    }
    useEffect(() => {
        console.log(snippets)

    })



    return (
        <div>

            <div className="snippetContainer">{snippets}</div>

            <div className="add-container">
                <div className="add-space"></div>
                <div className="add-button">
                    
                    <Fab onClick={addSnippet} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        </div>
    );
}

export default SnippetHolder;