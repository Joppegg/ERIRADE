import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


//This is for the checkboxes
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));




function TagSelector({onTagChange}) {

    const [tags, setTags] = useState([])
    useEffect(() => {
        // through all the tags. If a tag is checked, append the id to an array, and then set new snippet state.
        const tagIdarray = [];
        tags.map((currentTag) =>{
            if (currentTag.isChecked === true){
                tagIdarray.push(currentTag.tagId)
            }
        })
        onTagChange(tagIdarray);

    }, [tags])

    const handleCheck = tag => event => {
        const stateArray = [];
  
            //this maps through all the old tags to push a new state array with the checked tag.
            tags.map((oldTag) => {
                if (oldTag.tagId === tag.tagId) {
                    stateArray.push({
                        tagId: oldTag.tagId,
                        tagName: oldTag.tagName,
                        isChecked: event.target.checked
                    })
    
                }
                else {
                    stateArray.push({
                        tagId: oldTag.tagId,
                        tagName: oldTag.tagName,
                        isChecked: oldTag.isChecked
                    })
               
                }
             }
            )   
            setTags(stateArray);
    }

    
    

    //This gets all the tags and saves them to state.
    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetDataFromDB.php')
            .then(res => {
                //Mappa igenom hela res.data, spara in variablerna i ny array.
                const newArray = [];
                res.data.map((tag) =>
                    newArray.push({
                        tagId: tag.tagId,
                        tagName: tag.tagName,
                        isChecked: false
                    })
                )
                setTags(newArray);
                 setLoading(false);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [isLoading, setLoading] = React.useState(true);

    return (
        <div>
            {isLoading ?
                <div> Loading.. please wait!</div>
                :
                <div>

                    {tags.map(tag => (
                        <FormControlLabel
                            control={<Checkbox
                                color="primary"
                                checked={tag.isChecked}
                                value={tag.tagId}
                                onChange={handleCheck(tag)}
                                key={tag.tagId}


                            />}
                            label={tag.tagName}
                        />
                    ))}
                </div>
            }

          

        </div>
    );
}

export default TagSelector;