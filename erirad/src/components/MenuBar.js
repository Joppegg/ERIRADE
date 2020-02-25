import React from 'react';
import {
    Link
} from "react-router-dom";
import '../css/Header.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));



function MenuBar(props) {

    const classes = useStyles();
    return (
        <div className="menuBar">
            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link style={{ textDecoration: 'none', color: 'black' }}  to="/">
                        <Button>Home
                              </Button>
                    </Link>
                </div>
            </div>

            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link style={{ textDecoration: 'none', color: 'black' }}  to="/search">
                        <Button>Search reports
                              </Button>
                    </Link>
                </div>
            </div>

            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link style={{ textDecoration: 'none', color: 'black' }}  to="/report">
                        <Button>Create report
                              </Button>
                    </Link>
                </div>
            </div>


            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link  style={{ textDecoration: 'none', color: 'black' }}  to="/createreport">
                        <Button>Create report request
                              </Button>
                    </Link>
                </div>
            </div>

            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link  style={{ textDecoration: 'none', color: 'black' }}  to="/sentrequests">
                        <Button>Your sent requests
                              </Button>
                    </Link>
                </div>
            </div>


        </div>
    );
}

export default MenuBar;