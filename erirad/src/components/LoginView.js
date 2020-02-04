import React, { useState } from 'react';
import axios from 'axios';



function LoginView({ onLogIn, onEmployeeLogin }) {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const handleInvalidInput = () => {
        setErrorMessage('Please enter a Registered user')
    }

    const handleLogIn = () => {

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/LoginEmployee.php`,
            headers: { 'content-type': 'application/json' },
            data: user

        })
            .then(result => {
                console.log(result.data)
                if (result.data.code === '2') {
                    console.log('Login success')
                    onEmployeeLogin(result.data.employeeId)
                    onLogIn(true)
                }
                else {
                    handleInvalidInput();
                }

            })
            .catch(error => console.log(error));



    }

    return (

        <div className="snippetContainer">
            <h2>Log in here!</h2>
            <div className="form-row">
                <input type="text" placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })}></input>
            </div>

            <div className="form-row">
                <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })}></input>
            </div>
            <div className="form-row">
            <button onClick={handleLogIn}>Log in </button>
            <p className="ErrorText">{errorMessage}</p>
            </div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default LoginView;