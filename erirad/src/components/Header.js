import React , {useState} from 'react';
import '../css/Header.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Header(props) {

    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userName: '',
        password:''
    })


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    return (
        <div>
            <div className="container">
                <h2>A very nice header!</h2>
                <div>
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
            label="First name"
            type="email"
            fullWidth
          />    
          <TextField
             margin="dense"
            label="Last name"
            type="text"
            fullWidth
          />
          <TextField
             margin="dense"
            label="Email"
            type="text"
            fullWidth
          />
          <TextField
             margin="dense"
            label="Phone number"
            type="text"
            fullWidth
          />
          <TextField
             margin="dense"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
             margin="dense"
            label="Password"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
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