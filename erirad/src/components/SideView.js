import React, {useState} from 'react';
import axios from 'axios';

function SideView(props) {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
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
            <form className="report-form">

                <div className="form-row-sideView">
                    <label>First Name </label>
                    <input type="text"
                    name="firstName"
                        value={user.firstName}
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                    />
                </div>

                <div className="form-row-sideView">
                    <label> Last name </label>
                    <input type="text"
                        value={user.lastName}
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                    />
                </div>

                <div className="form-row-sideView">
                    <label> Email </label>
                    <input type="text"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                    />
                </div>

                <div className="form-row-sideView">
                    <label> Phone number </label>
                    <input type="text"
                        value={user.phoneNumber}
                        onChange={e => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                </div>


                <input type="button" value="submit" onClick={handleFormSubmit} />
                
            </form>
        </div>
    );
}

export default SideView;