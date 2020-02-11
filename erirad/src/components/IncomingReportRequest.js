import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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
    const classes = useStyles();

    return (
        <List className={classes.root}>
        
          
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