import React, {Component} from 'react';
import './Home.css'

class Home extends Component {
  
    render() {
        return <div className='Home'>
            <p>PROFILE</p>
            {<div className="Profile-Page">
                <div className="Profile-Overview">
                    <div className="Profile-Picture">
                        <img src="Images/profile.png"/>
                    </div>
                    <div className="Profile-Account-Info">
                        <p>Name</p>
                        <p>Age</p>
                        <p>UID</p>
                        <p>Occupation</p>
                    </div>
                    <div className="Profile-Account-QR">
                        <img src=""/>
                    </div>
                </div>

                <div className="Profile-Overview-Header">
                    <ul>
                        <li><img src="Icons/home.png"/></li>
                        <li><img src="Icons/profile.png"/></li>
                        <li><img src="Icons/profile.png"/></li>
                        <li><img src="Icons/profile.png"/></li>
                    </ul>
                </div>
            </div>
            }
        </div>

    }
}

export default Home;
