import 'date-fns';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signInEmployee } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';



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
        }
    },
}));

//This function is responsible for creating a report group.
function CreateReportRequest(props) {
   
    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetAllEmployees.php')
            .then(res => {
                //Mappa igenom hela res.data, spara in variablerna i ny array.
                console.log(res.data);
                setAllEmployees(res.data);
               // setLoading(false);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    const handleChange = event => {
        setValue(event.target.value);
    };

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
                <h2> Hello</h2>
                <button> Create report request</button>

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

                <pre>{JSON.stringify(employee, null, 2)}</pre>
                <pre>{JSON.stringify(createReport, null, 2)}</pre>
            

            </div>
        </div>
    );
}
export default CreateReportRequest;