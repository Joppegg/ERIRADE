import React, { useState, useEffect, useReducer } from 'react';
import '../css/ReportSubmit.css'
function ReportSubmit(props) {

    const [report, setReport] = useState({
        name: '',
        text: ''
    })

    const handleSubmit = () => {
        console.log(report)
        //Axios post här
    }

    return (
        <div className="main-column">
            <form className="report-form" onSubmit={handleSubmit}>

                <div className="form-row">
                    <label>Name</label>
                    <input type="text"
                        value={report.name}
                        onChange={e => setReport({ ...report, name: e.target.value })}
                    />
                </div>

                <div className="form-row">
                    <label> Report </label>
                    <textarea
                        rows="15"
                        placeholder="Write something"
                        value={report.text}
                        onChange={e => setReport({ ...report, text: e.target.value })}
                    >
                    </textarea>
                </div>


                <input type="button" value="submit" onClick={handleSubmit} />
                <h2>{JSON.stringify(report)}</h2>
            </form>
        </div>

    );
}

export default ReportSubmit;