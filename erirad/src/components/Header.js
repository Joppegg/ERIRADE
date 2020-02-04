import React, { useState } from 'react';
import '../css/Header.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import CreateReport from './CreateReport';



function Header(props) {

    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userName: '',
        password: ''
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegister = (e) => {
        setOpen(false);
        console.log(user)

        e.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/SignUpEmployee.php`,
            headers: { 'content-type': 'application/json' },
            data: user
        })
            .then(result => {
                console.log(result)
                console.log(result.data)
            })
            .catch(error => console.log(error));

    };


    return (
        <div>
            <div className="container">
                <div className="logo">
                    <a href="localhost:3000">
                        <img alt="logo" className="logoImg" src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ericsson_logo.svg/512px-Ericsson_logo.svg.png' />
                    </a>
                </div>
                <h2>A very nice header!</h2>
                <CreateReport />
                
                <div className="menuButton">
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Register user
                   </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Register a user here
                       </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                value={user.firstName}
                                onChange={e => setUser({ ...user, firstName: e.target.value })}
                                label="First name"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={user.lastName}
                                onChange={e => setUser({ ...user, lastName: e.target.value })}
                                label="Last name"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                                label="Email"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={user.phoneNumber}
                                onChange={e => setUser({ ...user, phoneNumber: e.target.value })}
                                label="Phone number"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={user.userName}
                                onChange={e => setUser({ ...user, userName: e.target.value })}
                                label="Username"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleRegister} color="primary">
                                Register
                           </Button>
                        </DialogActions>
                    </Dialog>



                </div>

            </div>

        </div>
    );
}

export default Header;