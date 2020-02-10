import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signInEmployee } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 600,
        },
    },
}));

//This function is responsible for creating a report group.
function CreateReportRequest(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = event => {
        setValue(event.target.value);
    };

    //Get logged in employee
    const employee = useSelector(state => state.employee);

    const [createReport, setCreateReport] = useState({
        title: '',
        description: '',
        deadline: '',
        employees: [

        ]

    })

    //Anställda i reportgruppen från en lista - get alla anställda.
    //Title - mata in fält. 
    //Deadline - välj i ett fält.
    //Create- 

    return (
        <div className="search-column-layout">
            <div className="homepageContainer">
                <h2> Hello</h2>
                <button> Create report request</button>

                <form className={classes.root} noValidate autoComplete="off">
                <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Title"
                            multiline
                            rows="1"  
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows="2"  
                            variant="outlined"
                        />
                    </div>
                </form>

                <pre>{JSON.stringify(employee, null, 2)}</pre>
                <pre>{JSON.stringify(createReport, null, 2)}</pre>
            </div>
        </div>
    );
}

export default CreateReportRequest;