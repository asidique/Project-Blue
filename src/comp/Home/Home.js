import React, {Component} from 'react';
import './Home.css'
import firebase from 'firebase'
import Web3 from 'web3'


var ob;

class Home extends Component {

  constructor(props) {
    super(props);
    ob = this;
    this.state = {
      Lname: "",
      Fname: "",
      UID: "",
      Balance: 0,
      Points: 0,
      Transaction: [],
      arr: [],
      web3: ""
    }

    this.render = this.render.bind(this);
  }

  componentDidMount() {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    var web3 = new Web3(provider);
    const rootref = firebase.database().ref('Accounts/' + web3.eth.accounts[0]);
    rootref.on('value', snap => {
      this.setState({
        Lname: snap.val().LastName,
        Fname: snap.val().FirstName,
        UID: snap.val().Address,
        Balance: snap.val().Balance,
        URL: snap.val().Image,
        Points: snap.val().Points
      })

    })
    const transref = firebase.database().ref('Transactions');
    transref.on('value', snap => {
      this.setState({
        arr: Object.values(snap.val())
      })
    })

  }

    render() {
        return <div className='Home'>
            <p className="Home-Title">Profile</p>
            <div className="Profile-Page">
                <div className="Profile-Overview">
                    <div className="Profile-Picture">
                        <img src={this.state.URL}/>
                    </div>
                    <div className="Profile-Account-Info">
                        <p>{this.state.Lname + ", " + this.state.Fname}</p>
                        <p>{"Address: " + this.state.UID}</p>
                        <p className="Profile-Balance">{"Balance: " + this.state.Balance + " ETH"}</p>
                        <p className="Profile-Balance">{"Loyalty Points: " + this.state.Points + " ETH"}</p>
                    </div>
                    <p className="Home-Title">Transaction History</p>
                    {
                      this.state.arr.map((obj, i) => {
                        var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
                        var web3 = new Web3(provider);
                        var blockHash = obj.blockHash;
                        var from = obj.from;
                        var to = obj.to;
                        var val = obj.value;
                        var time = web3.eth.getBlock(blockHash).timestamp;
                        var date = new Date(time*1000);

                        if(from == ob.state.UID) {
                          return(
                            <div className="Buying-post" key={i}>
                                <div className="Buying-post-text">
                                  <p className="Buying-post-text-id">{"Transaction ID: " + blockHash}</p>
                                    <p className="Buying-post-text-from">{"FROM: " + from}</p>
                                    <p className="Buying-post-text-to">{"TO: " + to}</p>
                                    <p className="Buying-post-text-val">{"VALUE: " + val}</p>
                                    <p className='Buying-post-text-time'>{"TIME: " + date}</p>
                                </div>
                            </div>
                          )
                        } else if(to = ob.state.UID) {
                          return(
                              <div className="Selling-post" key={i}>
                                  <div className="Selling-post-text">
                                    <p className="Selling-post-text-id">{"Transaction ID: " + blockHash}</p>
                                      <p className="Selling-post-text-from">{"FROM: " + from}</p>
                                      <p className="Selling-post-text-to">{"TO: " + to}</p>
                                      <p className="Selling-post-text-val">{"VALUE: " + val}</p>
                                      <p className='Selling-post-text-time'>{"TIME: " + date}</p>
                                  </div>
                              </div>
                          )
                        }

                      })
                    }
                </div>
            </div>
        </div>

    }
}

export default Home;
