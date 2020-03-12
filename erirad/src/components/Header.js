import React, { useState} from 'react';
import '../css/Header.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';



function Header(props) {

    const login = useSelector(state => state.loggedReducer);
    const employee = useSelector(state => state.employee);
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
                <div className="logoItem">
                    <a href="localhost:3000">
                        <img alt="logo" className="logoImg" src='data:image/png;base64,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' />
                    </a>
                </div>
            
                <div className="menuItem">
                    <h1>ERIRAD</h1>
                 </div>
                {
                    login ? 
                    <h1>Welcome {employee.firstName}</h1>
                    :
                    null
                    //Vill ju att denna nedanför ska ändras när man loggar in - typ welcome: Andreas
                
           
                }           
                 <div className="logoItem">
                  
                </div>
                {/*
                <div className="menuItem">
                    <CreateReport />
                </div>*/
            }
                 
                 {
                <div className="menuItem">
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
                                value={user.role}
                                onChange={e => setUser({ ...user, userRole: e.target.value })}
                                label="Role"
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
                }

            </div>

        </div>
    );
}

export default Header;