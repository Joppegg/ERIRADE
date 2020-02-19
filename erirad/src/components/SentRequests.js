
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SentRequests(props) {

    const employee = useSelector(state => state.employee);
    const dispatch = useDispatch();
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/ManagerView.php`,
            headers: { 'content-type': 'application/json' },
            data: { employeeId: employee.employeeId }
            })
            .then(result => {
                console.log("Data from Getreports:")
                console.log(result.data)
                setReportList(result.data)
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        console.log("State reportlist:")
        console.log(reportList)


    },[reportList])


    return (
        <div className="snippetContainer">
            <div className="overViewHomePage">
                <div className="sentRequestList">
                    <h2>Your sent report requests</h2>

                </div>
            </div>
        </div>
    );
}

export default SentRequests;