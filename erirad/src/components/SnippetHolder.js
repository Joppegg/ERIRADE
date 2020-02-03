import React, { useState} from 'react';
import '../css/Header.css'
import Snippet from './Snippet';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import axios from 'axios';

/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/

function SnippetHolder(props) {

    const [textvalues, setTextValues] = useState([])
    const [tagValues, setTagValues] = useState({})
    const [snippetTextArea, setSnippetTextArea] = useState([{}]);

    const [tags, setTags] = useState({
        
    })
     
  

    //Uppdaterar state med texterna.
    const handleFieldChange = (fieldId, value) =>{
        setTextValues({...textvalues, [fieldId]: value});
    };
    const handleTagChange = (tagId, value) => 
    { 
       setTagValues({...tagValues, [tagId] : value})
       //Tag id vill vi ha kvar.
       setTags({...tags, [tagId]: value})
    };

    const handleTagId = (tagId, value) => 
    { 
        setTags({...tags, [tagId] : value })
    };

    const newSnippets = snippetTextArea.map((snippet, index) => (
          <Snippet
          key={index}
          id={index}
          onChange={handleFieldChange}
          onTagId={handleTagId}
          onTagChecked={handleTagChange}
          value={textvalues[snippet]}
        />
    ));

    const addSnippet = () => {
        setSnippetTextArea([...snippetTextArea, null]);
        //Pusha först ett tomt värde i parent, med id
    }

    const handleSubmit = () => {
       // const testArray = {testArray: ["1", "hej"]}
        const namedList = {textValues: textvalues}
        console.log(JSON.stringify(namedList))
        console.log(namedList)
        axios({
          method: 'post',
          url: `http://localhost/ERIRADAPP/erirad/src/php/SnippetPost.php`,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(namedList, null,2)
        })
          .then(result => {
            console.log(result)
            console.log(result.data)
          })
          .catch(error => console.log(error));

    }

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
                    onClick={handleSubmit}
                 >
                    Submit Report
                       </Button>
            </div>
            <pre>{JSON.stringify(tags, null, 2)}</pre>
            <pre>{/*JSON.stringify(textvalues, null, 2)*/}</pre>
            <pre>{/*JSON.stringify(tagValues, null, 2)*/}</pre>   
        </div>
    );
}

export default SnippetHolder;