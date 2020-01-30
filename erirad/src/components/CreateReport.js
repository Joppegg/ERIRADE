import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function CreateReport(props) {

    const [open, setOpen] = React.useState(false);

    const [user, setUser] = useState({
        employeeId: '',
        submitted: false
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSubmit= (e) => {
        setOpen(true);

        e.preventDefault();
        axios({
          method: 'post',
          url: `http://localhost/ERIRADAPP/erirad/src/php/NewReport.php`,
          headers: { 'content-type': 'application/json' },
          data: user
        })
          .then(result => {
            console.log(result)
            console.log(result.data)
            setOpen(false)
          })
          .catch(error => console.log(error));
        

    }

    return (
        <div>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create report
              </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter employee id
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={user.employeeId}
                            onChange={e => setUser({ ...user, employeeId: e.target.value })}
                            label="Employee Id"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Create report
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateReport;