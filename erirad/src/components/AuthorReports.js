import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    root: {
      width: 1000,
      maxWidth: 1000,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
function AuthorReports(props) {
    const employee = useSelector(state => state.employee);
    const [snippetTextArray, setSnippetTextArray] = useState([]);
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
    });
    const handleSearch = ()=> {
        console.log(author);
        

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/FilterByAuthor.php`,
            headers: { 'content-type': 'application/json' },
            data: author
        })
            .then(result => {
                console.log(result.data)

            })
            .catch(error => console.log(error));

    }

    return (
        <div className="search-column-layout">
            <div className="homepageContainer">
                <h2> Hello</h2>
                
                <TextField 
                id="outlined-multiline-static"
                label="Employee First Name"
                value={author.firstName} onChange={e => setAuthor({ ...author, firstName: e.target.value })}
                multiline
                rows="1"
                variant="outlined"
                />
                <TextField 
                id="outlined-multiline-static"
                label="Employee Last Name"
                value={author.lastName} onChange={e => setAuthor({ ...author, lastName: e.target.value })}
                multiline
                rows="1"
                variant="outlined"
                />
                <button onClick={handleSearch}> Search for author</button>
            </div>
        </div>
    );
    
}
export default AuthorReports;