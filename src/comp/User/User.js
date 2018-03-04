import React from 'react';
import './User.css'
import firebase from '../firebase'
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: []
    }
  }

  componentDidMount() {
    const rootref = firebase.database().ref('Accounts/');

    rootref.on('value', snap => {
      this.setState({
        Users: snap.val()
      })
    })
  }

  render() {
    var data = Object.values(this.state.Users);
    var list = Object.keys(Object.keys(this.state.Users));

    return(
      <div className="User">
        {
          list.map((index, i) => {
            return(
                <div className="User-post" key={i}>
                    <img className="User-post-img" src={data[index].Image}/>
                    <div className="User-post-text">
                        <p className="User-post-name">{data[index].LastName + ", " + data[index].FirstName}</p>
                        <p className="User-pos-address">{"Address: " + data[index].Address}</p>
                    </div>
                </div>
            )
          })
        }
      </div>
    )
  }

}

export default User;
