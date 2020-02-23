import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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

function ManagerReportView(props) {
    const classes = useStyles();
    return (
        <div className="ManagerReportContainer">
            <div className="overViewManagerViewReport">
                <h2>Big reportWindow over here, where you can merge reports from the right.</h2>
                <textarea
                    rows="24"
                    cols="140"

                // onChange={e => setSnippet({ ...snippet, text: e.target.value })}

                >
                </textarea>

            </div>
            <div className="overViewManagerViewSideBar">
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
        
                    <Checkbox/>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Monthly Report"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Anställd Anställdsson
              </Typography>
                                    {" — Status for Week 7 to be…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                    <Checkbox/>
                        <ListItemAvatar>
                   
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Monthly Report"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Kalle Moraeus
              </Typography>
                                    {" — lorem ipsum dolor sit amet …"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                    <Checkbox/>
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Monthly Report"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        James B
              </Typography>
                                    {' — lorem ipsum dolor sit amet'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                <div className="managerViewMerge">
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Merge into document
                   </Button>
                      
                    </div>
                </div>


            </div>
            </div>
        </div>
    );
}

export default ManagerReportView;