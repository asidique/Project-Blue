import React, {Component} from 'react';
import './Post.css'
import firebase from '../firebase'
import Web3 from 'web3'


var ob;
var accountOwner, web3;

function writePostData(id, name, description, imageURL, cost, owner) {
  accountOwner = web3.eth.accounts[0];
  firebase.database().ref('Posts/' + id).set({
    Name: name,
    ImageSource : imageURL,
    Description : description,
    OwnerAddress : accountOwner,
    Cost: cost,
    UID: id
  });
}

function writeItemData(id, name, description, imageURL, owner) {
  accountOwner = web3.eth.accounts[0];
  firebase.database().ref('Items/' + id).set({
    Name: name,
    ImageSource : imageURL,
    Description : description,
    OwnerAddress : accountOwner
  });
}

class Post extends Component {

  constructor(props) {
    super(props);
    ob = this;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    web3 = new Web3(provider);
    accountOwner = web3.eth.accounts[0];
    this.state = {
      Name: "",
      Description: "",
      Cost: 0,
      ImageURL: ""
    }

  }

  updateDatabase(id, name, desc, cost, imageurl) {
    writePostData(id, name, desc, imageurl, cost, null);
    writeItemData(id, name, desc, imageurl, null);
  }

  handleSubmit() {
    alert('Your ad was posted');
    firebase.database().ref('Posts').once('value').then(function(snap2) {
      length = Object.keys(snap2.val()).length;
      console.log("DATA OBJECT: " +  Object.keys(snap2.val()));
      var a = Object.keys(snap2.val())[length-1];
      console.log("LENGTH: " + a);
      ob.setState({
        Name: ob.Name.value,
        Description: ob.Description.value,
        Cost: ob.Cost.value,
        ImageURL: ob.URL.value
      }, () => {ob.updateDatabase((parseInt(a)+1), ob.Name.value, ob.Description.value, ob.Cost.value, ob.URL.value)})
    });



  }
  render() {
    return(
      <div className="Post">
        <p className="Post-Title">Post Your Ad</p>
        <p className="h4">Your Address: {accountOwner}</p>
        <form className="Post-Form" id="myForm" onSubmit={this.handleSubmit}>
        <table className="Post-Form-Table">
          <tbody>
          <tr>
            <td className="Post-Table-Label"><p>Name of Ad</p></td>
            <td><input className="Post-Form-Input" placeholder="My Amazing Ad" ref={(input) => { this.Name = input; }} /></td>
          </tr>
          <tr>
            <td className="Post-Table-Label"><p>Description</p></td>
            <td><input className="Post-Form-Input" placeholder="My Amazing Description" ref={(input) => { this.Description = input; }} /></td>
          </tr>
          <tr>
            <td className="Post-Table-Label"><p>Cost</p></td>
            <td><input className="Post-Form-Input" type="number" step="any" placeholder="1 ETH" ref={(input) => { this.Cost = input; }} /></td>
          </tr>
          <tr>
            <td className="Post-Table-Label"><p>Image URL</p></td>
            <td><input className="Post-Form-Input" placeholder="https://www.images.com/myimage.png" ref={(input) => { this.URL = input; }} /></td>
          </tr>
          </tbody>
        </table>
        <button form="myForm" className='Post-Form-Btn' value="Submit">Submit</button>
       </form>
      </div>
    )
  }
}

export default Post;
