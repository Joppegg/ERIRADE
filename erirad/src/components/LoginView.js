import React, { useState } from 'react';
import axios from 'axios';



function LoginView({onLogIn, onEmployeeLogin}) {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleLogIn = () => {

        axios({
            method: 'post',
            url: `http://localhost/ERIRADAPP/erirad/src/php/LoginEmployee.php`,
            headers: { 'content-type': 'application/json' },
            data: user
            
        })
            .then(result => {
                console.log(result.status)
                console.log(result.data)
            })
            .catch(error => console.log(error));
            
            onLogIn(true)


    }

    return (
       
            <div className="snippetContainer">
            <h2>Log in here!</h2>
            <input type="text" placeholder="Username" onChange={ e => setUser({...user, username: e.target.value})}></input>
            <input type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value })}></input>
            <button onClick={handleLogIn}>Log in by clicking this.</button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default LoginView;