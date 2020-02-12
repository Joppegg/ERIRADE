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
import axios from 'axios';




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
    return <ListItem button component="a" {...props} />;
}

function IncomingReportRequest(props) {
    const [reportList, setReportList] = useState({
        reports: []
    });

    const classes = useStyles();
    const employee = useSelector(state => state.employee);
    
    //For the logged in Employee, loop through the employeeInputField.
    //Save the EmployeeInputs in a list.
    //With a click on the list, launch a new view with Create Report. Send in the EmployeeInput Props.
    //In this new view, Show the Title and description.
    //On submit, submit this into employee input

    useEffect(() => {
        console.log("employee")
        console.log(employee.employeeId)
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ReceiveEmpInput.php`,
            headers: { 'content-type': 'application/json' },
            data: {employeeId: employee.employeeId}
            })
            .then(result => {
                console.log(result.data)
                setReportList({reports:[result.data]})
            })
            .catch(error => console.log(error));
    }, [employee])


    useEffect(() => {
        console.log(reportList)
       console.log("use effect called reportlist")
       reportList.reports.map((report) => { 
            console.log(report.employeeId)
        })

    
    }, [reportList])
    return (

        <List className={classes.root}>
        <pre>{JSON.stringify(employee.employeeId, null, 2)}</pre>
        <pre>{JSON.stringify(reportList, null, 2)}</pre>
            <Divider variant="inset" component="li" />
            <ListItemLink href="#simple-list">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Projékt Ledersson" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Project report february"
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
                                {" — This month the focus will be on…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </ListItemLink>
            <Divider variant="inset" component="li" />
            <ListItemLink href="#simple-list">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Monthly report"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Chef Chefsson
              </Typography>
                                {' — Dont forget to fill in the...'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </ListItemLink>
        </List>
    );
}

export default IncomingReportRequest;