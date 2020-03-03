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
import { setRequest} from '../actions';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'green',
    },
    inline: {
        display: 'inline',
    },
}));

function ListItemLink(props) {
    return <ListItem button  {...props} />;
}

function SentRequests(props) {

    const classes = useStyles();
    const employee = useSelector(state => state.employee);
    const dispatch = useDispatch();
    const selectedRequest = useSelector(state => state.requestSelected);
    const [reportList, setReportList] = useState([]);
    const [reportCards, setReportCards] = useState([]);


    useEffect(() => {
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ManagerViewReportRequest.php`,
            headers: { 'content-type': 'application/json' },
            data: { employeeId: employee.employeeId }
            })
            .then(result => {
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
    }, [])

    useEffect(() => {
        console.log("State reportlist:")
        console.log(reportList)

    },[reportList])

    const handleClick = (report) => {
        console.log(report)
    }

    const handleListItemClick =(event) => {
        console.log(event)
        //Skapa dispatch för speciifc report
        //dispatch(setSpecificReport(event))
        dispatch(setRequest(event))
    }

    useEffect(() => {

        const fetchReportCards = reportList.map((report) => (

            <div 
          
            className= {
                report.isSubmitted === 'true' ?
                "finished"
                :
                "notFinished"
                }
            >
            <Divider variant="inset"  />
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/reportinput">
                <ListItemLink>
               
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
                   
                </ListItemLink>
                </Link>
                </div>     
        ));
        setReportCards(fetchReportCards);
    }, [reportList])

    return (
        <div className="snippetContainer">
            <div className="overViewHomePage">
                <div className="sentRequestList">
                    <h2>Your sent report requests</h2>
                    <div className="requestRow">
                    {reportCards}  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SentRequests;