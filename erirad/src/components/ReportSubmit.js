import React, { useState, useEffect } from 'react';
import '../css/ReportSubmit.css'
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


function ReportSubmit(props) {
    //CHECKBOX
    const classes = useStyles();
    const [isLoading, setLoading] = React.useState(true);
    
    //CHECKBOX
    const [report, setReport] = useState({
        text: '',
        isLoading: true
    })
    const [snippet, setSnippet] = useState({
     text: '',
     tags: []
    })


    const [tags, setTags] = useState([])
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
        console.log(tags)
        console.log(snippet)
        
    }

    useEffect(() => {
        // through all the tags. If a tag is checked, append the id to an array, and then set new snippet state.
        console.log("useffect hit")
        const tagArray = [];
        tags.map((currentTag) =>{
            if (currentTag.isChecked === true){
                tagArray.push(currentTag.tagId)
            }
        })
        console.log(tagArray)
        setSnippet({...snippet, tags:tagArray})
       

    }, [tags])

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
                tags.map(tag => console.log(tag))

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleClick = () =>{
        console.log(snippet)
    }

    return (
        <div className="main-column">
            <form className="form-Container">

                <div className="form-row">
                    <label> Snippet </label>
                    <textarea
                        rows="12"
                        cols="170"
                        value={snippet.text}
                        onChange={e => setSnippet({ ...snippet, text: e.target.value })}
                    >
                    </textarea>
                </div>
                <div className="form-row">
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Select Tags</FormLabel>
                            <FormGroup aria-label="position" row>
                                <div className="form-row">
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
                                                        

                                                    />}
                                                    label={tag.tagName}
                                                />
                                            ))}
                                        </div>
                                    }
                                </div>
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                    <Button variant="contained" color="primary" onClick={handleClick}>
                        Submit
                       </Button>
                </div>
            </form>
        </div>

    );
}

export default ReportSubmit;