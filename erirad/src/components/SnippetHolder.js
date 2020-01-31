import React, { useState, useEffect } from 'react';
import '../css/Header.css'
import ReportSubmit from './ReportSubmit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';

/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/

function SnippetHolder(props) {


    const onParentSubmit = () =>{
        this.child.method()
    }

    const [snippets, setSnippets] = useState([
        <ReportSubmit/>
     ])

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

    //this should invoke a callback method in all snippets, sending them into the database

    
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
            <div className="form-row">
                    <Button variant="contained" color="primary">
                        Submit Report
                       </Button>
                </div>
        </div>
    );
}

export default SnippetHolder;