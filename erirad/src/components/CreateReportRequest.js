import 'date-fns';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signInEmployee } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import {useToasts} from "react-toast-notifications";


//This function is responsible for creating a report group.
function CreateReportRequest(props) {
    const {addToast} = useToasts()
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [submittedText, setSubmittedText] = useState("Submit Report")
    
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 600,
            },
            selectEmployeeBox: {
                width: 500,
                '& > * + *': {
                    marginTop: theme.spacing(3),
                },
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
        },
    
        
    }));
    
    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetAllEmployees.php')
            .then(res => {
                //Mappa igenom hela res.data, spara in variablerna i ny array.
                console.log(res.data);
                setAllEmployees(res.data);
                //setLoading(false);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = () => {
        const payload = {
            requesterId: employee.employeeId,
            report: createReport
        }

        axios({

            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ReportRequest.php`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(payload, null, 2)

        })
            .then(result => {
                console.log(JSON.stringify(payload, null, 2))
                console.log(result.data)
                addToast("Report request sent", {appearance:'success'})
                

            })
            .catch(error => console.log(error));

    }

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    const handleChange = event => {
        setValue(event.target.value);
    };
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    //Get logged in employee
    const employee = useSelector(state => state.employee);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-12T21:11:54'));
    const handleDateChange = date => {
        setSelectedDate(date);
        setCreateReport({ ...createReport, deadline: date });
    };

    const [allEmployees, setAllEmployees] = useState({});

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
                <h2>Submit a report request </h2>
         

                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Title"
                            onChange={e => setCreateReport({ ...createReport, title: e.target.value })}
                            multiline
                            rows="1"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            onChange={e => setCreateReport({ ...createReport, description: e.target.value })}

                            multiline
                            rows="2"
                            variant="outlined"
                        />
                    </div>
                </form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Deadline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>
                <div className={classes.root}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={allEmployees}
                        getOptionLabel={option => option.email}               
                        onChange={(event, value) =>  setCreateReport({...createReport, employees:value})}
                        renderInput={params => (
                     
                            <TextField
                                {...params}
                                variant="standard"
                                label="Add persons"
                                placeholder="Favorites"
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div className="form-row-submit">
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button 
                            variant="contained" 
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={handleSubmit}
                            >
                            {submittedText}
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </div>
                </div>
            

            </div>
        </div>
    );
}
export default CreateReportRequest;