import React, {useState, useEffect} from 'react';
import '../css/Header.css'
import ReportSubmit from './ReportSubmit';
/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/
function SnippetHolder(props) {

    const [snippets, setSnippets] = useState([
        ]
    )

    const addSnippet = () => {
        const snippet = (
            <ReportSubmit/>
        )
        setSnippets([...snippets, snippet])
    
     console.log(snippets)
    }
    useEffect(() =>{
        console.log(snippets)

    })
        
    

    return (
        <div>
        <button onClick={addSnippet}>Add A new Div! </button>

        <div className="snippetContainer">{snippets}</div>
        </div>
    );
}

export default SnippetHolder;