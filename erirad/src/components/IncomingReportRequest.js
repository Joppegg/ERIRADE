import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReport } from '../actions';
import axios from 'axios';
import {
    Link
} from "react-router-dom";



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));



function ListItemLink(props) {
    return <ListItem button  {...props} />;
}

function IncomingReportRequest(props) {
    const [reportList, setReportList] = useState([]);
    const [reportCards, setReportCards] = useState([]);
    const classes = useStyles();
    const employee = useSelector(state => state.employee);
    const dispatch = useDispatch();
    //For the logged in Employee, loop through the employeeInputField.
    //Save the EmployeeInputs in a list.
    //With a click on the list, launch a new view with Create Report. Send in the EmployeeInput Props.
    //In this new view, Show the Title and description.
    //On submit, submit this into employee input

    useEffect(() => {
        console.log("UseEffect for employee Called")
        console.log(employee.employeeId)
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ReceiveEmpInput.php`,
            headers: { 'content-type': 'application/json' },
            data: { employeeId: employee.employeeId }
        })
            .then(result => {
                console.log("Data from RecieveEmpInput:")
                if(result.data.length!= 0){
                    setReportList(result.data)
                    console.log(result.data)
                    console.log(result.data.length)
                }
                else {
                    console.log("empty")
                    console.log(result.data)
                    console.log(result.data.length)
                }
             
            })
            .catch(error => console.log(error));
    }, [employee])


    const handleClick = (report) => {
        console.log(report)
    }

    const handleListItemClick =(event) => {
        //HANDLE om det är här.
        
        console.log(event)
        dispatch(setReport(event))
    }
  
    //Här, kolla om rapporten är en manager report. I sådana fall, linka till Create Report Request, som laddas 
    // in med tidigare props. Annars,
    //L
    useEffect(() => {
        const fetchReportCards = reportList.map((report) => (


            <div >
            <Divider variant="inset" component="li" />
                <ListItemLink>
                    
                <Link style={{ textDecoration: 'none', color: 'black' }} to={report.managerToManager == 'true' ? "/createreport" : "/report"}>
                    <ListItem 
                    onClick={event => handleListItemClick(report)}
                    button 
             
                     alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Projékt Ledersson" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={report.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Projékt Ledersson
                                 </Typography>
                                    {" — " +  report.description}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    </Link>
                </ListItemLink>
                </div>     
        ));

        setReportCards(fetchReportCards);
  


    }, [reportList])

   


    return (

        <List className={classes.root}>
            {reportCards}       
        </List>
    );
}

export default IncomingReportRequest;