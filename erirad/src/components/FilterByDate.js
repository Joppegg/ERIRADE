import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SingleSnippetCard from './SingleSnippetCard';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { set } from 'date-fns';
import * as moment  from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function FilterByDate(props) {
  const [snippets, setSnippets] = useState([]);
  const employee = useSelector(state => state.employee);
  const [snippetTextArray, setSnippetTextArray] = useState([]);
  const [date, setDate] = useState({
    fromDate: '2020-02-11T21:11:54',
    toDate: '2020-02-12T21:11:54',
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-12T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
       
    };

  
    const handleDateTo = (param) => {
      console.log("Param är: ")
      console.log(param)
      const newDate = moment(param).format('YYYY-MM-DD')
      console.log("Todate är:")
      console.log(newDate)
      setDate({...date,
              toDate: newDate})
    }
    
    const handleDateFrom = (param) => {

      const beginDate = moment(param).format('YYYY-MM-DD')
      console.log(beginDate);
      setDate({...date,
      fromDate: beginDate })

    }
    



  const handleDateSearch = () => {
    console.log(date);

    axios({
      method: 'post',
      url: `http://localhost/ERIRADAPP/erirad/src/php/FilterByDate.php`,
      headers: { 'content-type': 'application/json' },
      data: date
    })
      .then(result => {
        console.log(result.data)

        //Mappa igenom hela res.data, spara in variablerna i ny array.
        const newArray = [];
        result.data.map((snippet) =>
          newArray.push({
            text: snippet.snippetText
          })
        )
        setSnippets(newArray);
        console.log(newArray)
      
      })
      .catch(error => console.log(error));

  }


  return (
    <div className="search-column-layout">
      <div className="homepageContainer">
        <h2>
          Filter by Date
        </h2>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="FromDate-picker-inline"
                    label="From Date:"
                    value={date.fromDate}
                    onChange={date => handleDateFrom(date)}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />

            </Grid>
        </MuiPickersUtilsProvider>


     
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="ToDate-picker-inline"
                    label="From Date:"
                    value={date.toDate}
                    onChange={ date => handleDateTo(date)}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />

            </Grid>
        </MuiPickersUtilsProvider>



        <Button
          variant="contained"
          color="primary"
          onClick={handleDateSearch}
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
  );

}
export default FilterByDate;