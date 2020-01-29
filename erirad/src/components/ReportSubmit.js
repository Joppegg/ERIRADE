import React, { useState, useEffect } from 'react';
import '../css/ReportSubmit.css'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


//This is for the checkboxes
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));


function ReportSubmit(props) {
    //CHECKBOX
    const classes = useStyles();
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,

    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    //CHECKBOX

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    const [report, setReport] = useState({
        name: '',
        text: '',
    })

    const [tags, setTags] = useState([])

    const handleSubmit = () => {
        console.log(report)
    }
    //This gets all the tags and saves them to state.
    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetDataFromDB.php')
            .then(res => {
                setTags(res.data)
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
                        placeholder="Write something"
                        value={report.text}
                        onChange={e => setReport({ ...report, text: e.target.value })}
                    >
                    </textarea>
                </div>
                <div className="form-row">
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Select Tags</FormLabel>
                            <FormGroup  aria-label="position" row>
                                <FormControlLabel
                                    control={<Checkbox
                                     color="primary"
                                     checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
                                    label="Gilad Gray"
                                />
                                <FormControlLabel
                                    control={<Checkbox 
                                    color="primary"
                                    checked={jason}
                                    onChange={handleChange('jason')} value="jason" />}
                                    label="Jason Killian"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                        checked={antoine} 
                                        color="primary"
                                        onChange={handleChange('antoine')}
                                         value="antoine" />
                                    }
                                    label="Antoine Llorca"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                        <Button variant="contained" color="primary">
                            Submit
                       </Button>
                    
                </div>


                <div className="form-row">
                    <ul>
                        {tags.map(tag => (
                            <li key={tag.tagId}>{tag.tagId} - {tag.tagName}
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>

    );
}

export default ReportSubmit;