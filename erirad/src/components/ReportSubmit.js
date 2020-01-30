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
        name: '',
        text: '',
        isLoading: true
    })

    const [tags, setTags] = useState([])

    const handleCheck = tag => event => {
        console.log(tag)
        const stateArray = [];

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

        console.log(tags)
        console.log(stateArray) 
        setTags(stateArray);



    }
 
    //This gets all the tags and saves them to state.
    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetDataFromDB.php')
            .then(res => {

                //Mappa igenom hela res.data, spara in variablerna i ny array.
                //  res.data.map(tag => console.log(tag)); //Funkar.¨

                const newArray = [];
                res.data.map((tag) =>
                    newArray.push({
                        tagId: tag.tagId,
                        tagName: tag.tagName,
                        isChecked: false
                    })
                )

                // newArray.map(tag => console.log(tag));

                setTags(newArray);
                setLoading(false);

                tags.map(tag => console.log(tag))

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="main-column">
            <form className="form-Container">
                <div className="form-row">
                    <label>Name</label>
                    <input type="text"
                        value={report.name}
                        onChange={e => setReport({ ...report, name: e.target.value })}
                    />
                </div>

                <div className="form-row">
                    <label> Report </label>
                    <textarea
                        rows="12"
                      
                        value={report.text}
                        onChange={e => setReport({ ...report, text: e.target.value })}
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
                    <Button variant="contained" color="primary">
                        Submit
                       </Button>

                </div>










            </form>
        </div>

    );
}

export default ReportSubmit;