import React, { useState, useEffect } from 'react';
import TagSelector from './TagSelector';
import { Button } from '@material-ui/core';
import axios from 'axios';
import SingleSnippetCard from './SingleSnippetCard'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AuthorReports from './AuthorReports';





//This function will serve as the main view when the user is logged in
function SearchReportView(props) {

    const [view, setView] = useState(false);
    

    const [tags, setTags] = useState([]);
    const [snippets, setSnippets] = useState([]);
    const getUnique = (arr, index) => {

        const unique = arr
            .map(e => e[index])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }



    const handleTagChange = (tagIdArray) => {
        //When this is called, it will set the tag array to be: { tags: ["1", "3", "5"]}, to be sent into the database.
        //What will be returned is a jsonarray with: snippetÌD and snippetText. 
        setTags(tagIdArray)
    }

    useEffect(() => {
        console.log(snippets);
    }, [snippets])
    
    const handleTagClick = () => {
        setView(false)
    }

    const handleAuthorClick = () => {
        setView(true)
    }
    
    const handleSearch = () => {
        const payload = { tags: tags }
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/SearchTags.php`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(payload, null, 2)

        })
            .then(result => {
                console.log(result.data)
                //Mappa igenom hela res.data, spara in variablerna i ny array.
                const newArray = [];
                result.data.map((snippet) =>
                    newArray.push({
                        id: snippet.snippetId,
                        text: snippet.snippetText
                    })
                )
                //    setSnippets(newArray);
                console.log(getUnique(newArray, 'id'))
                setSnippets(getUnique(newArray, 'id'))

            })
            .catch(error => console.log(error));

    }
    

    return (

     
        <div className="search-column-layout">

        <div className="homePageSideView">
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >
                    <Button
                    onClick = {handleTagClick}
                    
                    >Filter by Tags</Button>
                    <Button
                    onClick = {handleAuthorClick}
                    
                    >Filter by Author</Button>
                </ButtonGroup>

            </div>

        {
                view ?
                <AuthorReports/>
                :

                <div className="homepageContainer">
                <div className="homepageRow">
                    <h2>Filter on what kind of information you would like to see here</h2>
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

                </div>

                <div className="homepageRow">
                    {snippets.map(snippet => (
                        <div className="homepageRow">
                            <SingleSnippetCard
                                text={snippet.text}
                            />
                        </div>
                    ))}

                </div>


            </div>


                }
      

        </div>
    );
}

export default SearchReportView;