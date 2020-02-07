import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../css/LoginView.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 350,
            color: 'white',
            background: 'white',

        },
    },

    button: {
        '& > *': {
            margin: theme.spacing(1),
            width: 350,
            color: 'black',
            background: 'white',

        },
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            background: "white"
        }

    },
}));


function LoginView({ onLogIn, onEmployeeLogin }) {

    const classes = useStyles();

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const handleInvalidInput = () => {
        setErrorMessage('Incorrect login information')
    }

    const handleLogIn = () => {

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/LoginEmployee.php`,
            headers: { 'content-type': 'application/json' },
            data: user
        })
            .then(result => {
                console.log(result.data)
                if (result.data.code === '2') {
                    console.log('Login success')
                    onEmployeeLogin(result.data)
                    onLogIn(true)
                }
                else {
                    handleInvalidInput();
                }

            })
            .catch(error => console.log(error));



    }

    return (

        <div className="loginContainer">

            <div className="form-row">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Username" variant="filled" onChange={e => setUser({ ...user, username: e.target.value })}/>
                </form>
            </div>


            <div className="form-row">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Password" type="password" variant="filled" onChange={e => setUser({ ...user, password: e.target.value })}/>
                </form>
            </div>
            <div className="form-row">
            <div className={classes.button}>
            <Button variant="outlined" onClick={handleLogIn} >Sign in</Button>
            </div>

                <p className="ErrorText">{errorMessage}</p>
            </div>
            <pre>{/*JSON.stringify(user, null, 2)*/}</pre>
        </div>
    );
}

export default LoginView;