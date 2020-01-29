import React, {useState} from 'react';
import axios from 'axios';

function SideView(props) {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })

    const handleSubmit = () => {
        console.log(user);

        axios.post(`http://localhost/react-test/addUser.php`, { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }


    return (
        <div className="sidebar-one">
            <h3>Sidebar one</h3>
            <form className="report-form" onSubmit={handleSubmit}>

                <div className="form-row-sideView">
                    <label>First Name </label>
                    <input type="text"
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


                <input type="button" value="submit" onClick={handleSubmit} />
                <h2>{JSON.stringify(user)}</h2>
            </form>
        </div>
    );
}

export default SideView;