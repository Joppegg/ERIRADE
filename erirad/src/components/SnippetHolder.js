import React, { useState, useEffect, useRef } from 'react';
import '../css/Header.css'
import ReportSubmit from './ReportSubmit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/

function SnippetHolder(props) {

    const [textvalues, setTextValues] = useState({});
    const [tagValues, setTagValues] = useState({})
    const [snippetTextArea, setSnippetTextArea] = useState([]);

    //Uppdaterar state med texterna.
    const handleFieldChange = (fieldId, value) =>{
        setTextValues({...textvalues, [fieldId]: value});
     
    };
    const handleTagChange = (tagId, value) => 
    { 
       setTagValues({...tagValues, [tagId] : value})
    };

    const newSnippets = snippetTextArea.map((snippet, index) => (
          <ReportSubmit
          key={index}
          id={index}
          onChange={handleFieldChange}
          onTagChecked={handleTagChange}
          value={textvalues[snippet]}
        />
    ));

    const addSnippet = () => {
        setSnippetTextArea([...snippetTextArea, null]);
        //Pusha först ett tomt värde i parent, med id
    }

    const returnTagvalues = () => {
        console.log(tagValues)
    }
    ///TODO:
    //Press submit to send the information into the database.
    //
    return (
        <div>
            <div className="snippetContainer">{newSnippets}</div>
            <div className="add-container">
                <div className="add-space"></div>
                <div className="add-button">
                    <Fab onClick={addSnippet} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>
            <div className="form-row">
                <Button
                    variant="contained"
                    color="primary"
                 >
                    Submit Report
                       </Button>
            </div>
            <pre>{JSON.stringify(textvalues, null, 2)}</pre>
            <pre>{JSON.stringify(tagValues, null, 2)}</pre>   
        </div>
    );
}

export default SnippetHolder;