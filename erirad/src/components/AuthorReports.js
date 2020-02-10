import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function AuthorReports(props) {

    const [snippetTextArray, setSnippetTextArray] = useState([]);
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
    });
    const handleSearch = ()=> {
        console.log(author);

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/FilterByAuthor.php`,
            headers: { 'content-type': 'application/json' },
            data: author
        })
            .then(result => {
                console.log(result.data)

            })
            .catch(error => console.log(error));

    }

    return (
        <div className="search-column-layout">
            <div className="homepageContainer">
                <h2> Hello</h2>
                <button onClick={handleSearch}> Search for author</button>

                
                <TextField value={author.firstName} onChange={e => setAuthor({ ...author, firstName: e.target.value })}/>
                <TextField value={author.lastName} onChange={e => setAuthor({ ...author, lastName: e.target.value })}/>
            </div>
        </div>
    );
}

export default AuthorReports;