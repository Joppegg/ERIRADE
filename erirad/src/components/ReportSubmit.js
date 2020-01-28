import React, {useState, useEffect, useReducer} from 'react';

function ReportSubmit(props) {

const [report, setReport] = useState({
    name: '',
    text: ''
})

    return (
        <div className="main-column">
            <form>
                <label>Name</label>
                <input type = "text"
                value= {report.name}
                onChange = { e => setReport({...report, name: e.target.value})}
                />
                <label> Report </label>
                <textarea id="subject" name="subject" placeholder="write something">


                </textarea>

                <input type="submit" value="submit"/>
            
            </form>
        </div>

    );
}

export default ReportSubmit;