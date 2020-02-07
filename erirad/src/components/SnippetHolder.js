import React, { useState, useEffect } from 'react';
import '../css/Header.css'
import Snippet from './Snippet';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
/*
*This functions purpose is to dynamically render and pass state to the child components, which will be individual snippets.
*/

function SnippetHolder({ employeeId }) {

    const [textvalues, setTextValues] = useState([])
    const [tagValues, setTagValues] = useState({})
    const [snippetTextArea, setSnippetTextArea] = useState([{}]);
    const [tags, setTags] = useState({
    })

    const [submittedText, setSubmittedText] = useState("Submit Report")

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        handleSubmit();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
                setSubmittedText("Submitted");
            }, 500);
        }
    };

    //Uppdaterar state med texterna.
    const handleFieldChange = (fieldId, value) => {
        setTextValues({ ...textvalues, [fieldId]: value });
    };
    const handleTagChange = (tagId, value) => {
        setTagValues({ ...tagValues, [tagId]: value })
        //Tag id vill vi ha kvar.


    };

    useEffect(() => {
        console.log("Tag values in snipept holder")
        console.log(tags)

    }, [tags])

    const handleTagId = (tagId, value) => {
        setTags({ ...tags, [tagId]: value })
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
        console.log("Logging eid")
        console.log(employeeId)
        const payload = {
            textValues: textvalues,
            matrix: tags,
            employeeId: employeeId
        }

        axios({

            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/SnippetPost.php`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(payload, null, 2)


        })
            .then(result => {
                console.log(result.data)

            })
            .catch(error => console.log(error));

    }

    return (
        <div>

            <div className="snippetContainer">
                <h3 className="text-center"> When submitted, these snippets are saved to a single report with individual tagging for filtering. </h3>
                {newSnippets}</div>
            <div className="add-container">
                <div className="add-space"></div>
                <div className="add-button">
                    <Fab onClick={addSnippet} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>

            <div className="form-row-submit">
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={handleButtonClick}
                        >
                            {submittedText}
                   </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>


            </div>

            <pre>{/*JSON.stringify(tags, null, 2)*/}</pre>
            <pre>{/*JSON.stringify(textvalues, null, 2)*/}</pre>
            <pre>{/*JSON.stringify(tagValues, null, 2)*/}</pre>
        </div>
    );
}

export default SnippetHolder;