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
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReport } from '../actions';
import { setRequest } from '../actions';
import axios from 'axios';
import Snippet from './Snippet';


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
    const [mockTags, setMockTags] = useState([

    ])

    const [tags, setTags] = useState([
        "5",
        "6"
        
    ])

    //Report cards, the list to the right.
    const [reportCards, setReportCards] = useState([]);

    //This is the "big" reporttext.
    const [reportText, setReportText] = useState("");
    
    const [individualText, setIndividualtext] = useState([

    ])
    const [employeeSnippet, setEmployeeSnippet] = useState({})
    //Just for mock data, replace this
    const [author, setAuthor] = useState({
        firstName: 'Jon',
        lastName: 'qweqw',
    });
    const [snippetTags, setSnippetTags] = useState({

    })

    const [tagNames, setTagNames] = useState("");

    const [textArray, setTextArray] = useState([]);

    const employee = useSelector(state => state.employee);
    const report = useSelector(state => state.report)
    const request = useSelector(state => state.requestSelected);

    const classes = useStyles();


    const getUnique = (arr, index) => {

        const unique = arr
            .map(e => e[index])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }


    const handleMerge = () => {

        //For every text
        setReportText("")
        individualText.map((report) => {
        const tagNames = "";
       
            if (report.isChecked===true){
                
                console.log(report.text)
                setReportText(prevState => 
                    prevState 
                     +               
                       snippetTags.map((tagList) => {
                        if (tagList.snippetId === report.id ){
                            return tagList.tagName + " "
                        } 
                    }).join('')  
                     + "\n" + report.firstName + " "
                     + report.lastName +"\n"
                     + report.text +
                       "\n\n")
            }
        })

        
        //Todo: Put text into textArea
        //Varje Report får ha ett id.
        //När man trycker på checkbox så skapas antingen id med texten, eller så tas det bort.
        console.log(textArray);

    }



    

    useEffect(() => {
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ManagerViewEmpInput.php`,
            headers: { 'content-type': 'application/json' },
            data: { requestId: request.requestId }
          
        })
        .then (result => {
            console.log(result.data)
            //Spara första snippet-datan
            const newArray = [];
            result.data.map((snippet) =>
                newArray.push({
                    id: snippet.snippetId,
                    firstName: snippet.firstName,
                    lastName: snippet.lastName,
                    text: snippet.snippetText,
                    isChecked: false,
                    tags: []
                })
            )

            //mappa igenom nya result igen.
            //Spara tagId, tagName för varje snippetId.
            const tagsArray = []
            //Först mappa array med 2 
            newArray.map((snippet) => 
                //sedan mappa array med 6
                result.data.map((oldSnippet) => 
                //Kolla om de har samma id. Isf, lägg till tagName och tagText.
                snippet.id === oldSnippet.snippetId ? 
                    tagsArray.push({
                        snippetId: snippet.id,
                        tagId: oldSnippet.tagId,
                        tagName: oldSnippet.tagName
                    })
                    :
                        null

            ) )


            //mappa igenom alla snippets 
            console.log(getUnique(newArray, 'id'))
            setEmployeeSnippet(getUnique(newArray, 'id'))
            setIndividualtext(getUnique(newArray, 'id'))
            console.log("Tags array")

            const uniq = new Set(tagsArray.map(e => JSON.stringify(e)));
            const res = Array.from(uniq).map(e => JSON.parse(e));
            console.log(res)

            console.log(getUnique(tagsArray, 'id'))
            console.log(tagsArray)
        

            setSnippetTags(res)
        })

    }, [])

    useEffect(()=>{
        console.log("Logging employee snippet:")
        console.log(employeeSnippet)
    }, [employeeSnippet])




    const handleSubmit = () => {
        console.log(reportText)
        const payload = {
            textValues: reportText,
            employeeId: employee.employeeId,
        }
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/PostManagerReport.php`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(payload, null, 2)
       
        })
            .then(result => {
                console.log(result.data)

            })
            .catch(error => console.log(error));
    }

    //When a checkbox is clicked, push or remove the id and text into textArray
    const handleCheck = snippet => event => {

        console.log(snippet)
    
        const stateArray = [];

        individualText.map((oldSnippet) => {
           
            if (oldSnippet.id === snippet.id) {
           

                stateArray.push({
                    id: oldSnippet.id,
                    firstName: oldSnippet.firstName,
                    lastName: oldSnippet.lastName,
                    text: oldSnippet.text,
                    isChecked: event.target.checked
                })

            }
            else {
    
                stateArray.push({
                    id: oldSnippet.id,
                    firstName: oldSnippet.firstName,
                    lastName: oldSnippet.lastName,
                    text: oldSnippet.text,
                    isChecked: oldSnippet.isChecked
                })
           
            }
         }
        )   
        setIndividualtext(stateArray);
        
    }


    //create list to the right from the fetched text.
    useEffect(() => {
        const fetchReportCards = individualText.map((report) => (
            <div key={report.id} >
                <Divider variant="inset" component="li" />
                        <ListItem
                            alignItems="flex-start">
                            <Checkbox
                            color="primary"
                            onChange={handleCheck(report)}

                            />
                            <ListItemAvatar>
                                <Avatar alt="Projékt Ledersson" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={report.id}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {report.firstName + " " + report.lastName}
                                 </Typography>
                                        {" — " + report.text}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                
            </div>
        ));

        setReportCards(fetchReportCards);
        console.log(individualText)
    }, [individualText])




    return (
        <div className="ManagerReportContainer">
            <div className="overViewManagerViewReport">
                <h2>Big reportWindow over here, where you can merge reports from the right.</h2>
                <textarea
                    rows="24"
                    cols="140"
                    value={reportText}
                    onChange={e => setReportText(e.target.value )}
                >

                </textarea>

            </div>
            <div className="overViewManagerViewSideBar">
                <List className={classes.root}>

                    {reportCards}
                
                </List>
                <div className="managerViewMerge">
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleMerge}
                            >
                                Merge into document
                        </Button>

                        </div>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Submit the big document
                        </Button>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ManagerReportView;