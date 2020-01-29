import React, { useState, useEffect } from 'react';
import '../css/ReportSubmit.css'
import axios from 'axios';
function ReportSubmit(props) {

    const [report, setReport] = useState({
        name: '',
        text: '',
        tags: []
    })

    const [tags, setTags] = useState([])

    const handleSubmit = () => {
        console.log(report)
        //Axios post här
    }

    useEffect(() => {
        axios.get('http://localhost/ERIRADAPP/erirad/src/php/GetDataFromDB.php')
            .then(res => {
                console.log(res)
                setTags(res.data)

                console.log(tags)
    
            })
            .catch(err => {
                console.log(err)
            })
      }, [])



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
                        rows="12"
                        placeholder="Write something"
                        value={report.text}
                        onChange={e => setReport({ ...report, text: e.target.value })}
                      >
                    </textarea>
                </div>

                <div className="form-row">
                    <label>Tags</label>
                </div>

                <input type="button" value="Submit snippet" onClick={handleSubmit} />
                
                <ul>
                    {tags.map(tag =>(
                      <li key={tag.tagId}>{tag.tagName}
                      </li>
                    ))}
                </ul>
            </form>
        </div>

    );
}

export default ReportSubmit;