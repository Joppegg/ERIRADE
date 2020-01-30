import React, {useState} from 'react';
import axios from 'axios';

function SideView(props) {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userName: '',
        password:''
    })



    const handleFormSubmit = e => {
        e.preventDefault();
        axios({
          method: 'post',
          url: `http://localhost/ERIRADAPP/erirad/src/php/SignUpEmployee.php`,
          headers: { 'content-type': 'application/json' },
          data: user
        })
          .then(result => {
            console.log(result);
            console.log(result.data)
          })
          .catch(error => console.log(error));
      };

    return (
        <div className="sidebar-one">
            <h3>Sidebar one</h3>
            <form>

                <div className="sidebar-form-row">
                    <label>First Name </label>
                    <input type="text"
                    name="firstName"
                        value={user.firstName}
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                    />
                </div>

                <div className="sidebar-form-row">
                    <label> Last name </label>
                    <input type="text"
                        value={user.lastName}
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                    />
                </div>

                <div className="sidebar-form-row">
                    <label> Email </label>
                    <input type="text"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                    />
                </div>

                <div className="sidebar-form-row">
                    <label> Phone no </label>
                    <input type="text"
                        value={user.phoneNumber}
                        onChange={e => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                </div>

                <div className="sidebar-form-row">
                    <label> Username</label>
                    <input type="text"
                        value={user.userName}
                        onChange={e => setUser({ ...user, userName: e.target.value })}
                    />
                </div>

                <div className="sidebar-form-row">
                    <label> Password </label>
                    <input type="password"
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                    />
                </div>


                <input type="button" value="submit" onClick={handleFormSubmit} />
                
            </form>
        </div>
    );
}

export default SideView;