import React from 'react';
import './Balance.css'
import Web3 from 'web3'
import firebase from '../firebase';

var obj;

class Balance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      points: 0
    }
    obj = this;
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    var web3 = new Web3(provider);
    const ref = firebase.database().ref('Accounts/' + web3.eth.accounts[0]);
    ref.on('value', function(snap) {
      obj.setState({
        balance: snap.val().Balance,
        points: snap.val().Points
      })
    });
  }

  render() {

    return(
      <div className="Balance">
        <p className='Balance-Text'>ETH Balance</p>
        <p className="Balance-Amount">{this.state.balance}</p>
        <p className="Balance-Text">Loyalty Points</p>
        <p className="Balance-Amount">{this.state.points}</p>
      </div>
    )
  }
}

export default Balance;
