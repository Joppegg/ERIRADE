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
                    <Link to="/">
                        <Button>Home
                              </Button>
                    </Link>
                </div>
            </div>

            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link to="/search">
                        <Button>Search reports
                              </Button>
                    </Link>
                </div>
            </div>

            <div className="menuBarColumn">
                <div className="menuBarColumn-button">
                    <Link to="/report">
                        <Button>Create report
                              </Button>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default MenuBar;