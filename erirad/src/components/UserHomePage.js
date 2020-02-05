import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TagSelector from './TagSelector';
import { Button } from '@material-ui/core';
import axios from 'axios';
import SingleSnippetCard from './SingleSnippetCard'

//This function will serve as the main view when the user is logged in
function UserHomePage(props) {

    const [employeeId, setEmployeeId] = useState(0);
    const [tags, setTags] = useState([]);

    const handleTagChange = (tagIdArray) => {
        //When this is called, it will set the tag array to be: { tags: ["1", "3", "5"]}, to be sent into the database.
        //What will be returned is a jsonarray with: snippetÌD and snippetText. 
        setTags(tagIdArray)
    }

    const handleSearch = () => {
        const payload =  {tags: tags}
        console.log(payload);

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/SearchTags.php`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(payload, null, 2)

        })
            .then(result => {
                console.log(result.data)

            })
            .catch(error => console.log(error));

    }

    return (
        <div className="snippetContainer">
            <div className="homepageContainer">
                <div className="homepageRow">
                    <Link to="/report">Your report view</Link>
                </div>

                <div className="homepageRow">
                    <h2>Filter on what kind of information you would like to see here!</h2>
                </div>
                <div className="homepageRow">
                    <TagSelector onTagChange={handleTagChange} />
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                        >
                            Search
                       </Button>
                       <pre>{JSON.stringify(tags, null, 2)}</pre>
                </div>

                <div className="homepageRow">
                    <SingleSnippetCard/>
                </div>


            </div>
        </div>
    );
}

export default UserHomePage;