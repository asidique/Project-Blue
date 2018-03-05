import React from 'react';
import './Scan.css'
import firebase from '../firebase'
import Web3 from 'web3'

var ob, def, searched;

class Scan extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 0,
      transaction: [],
      users: [],
      items: []
    }
    ob = this;
    def = [0];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  handleSubmit() {
    console.log(this.UID.value);
    var id = this.UID.value;
    searched = true;
    const transactionRootref = firebase.database().ref('Transactions');
    transactionRootref.once('value').then(function(snap) {
      var data = snap.val();
      var transactions = Object.keys(data);
      console.log(transactions);
      //console.log(accounts.length);
      //accountOwner = accounts[0].Address;
      for(var i = 0; i < transactions.length+1; i++) {
        if(transactions[i] == id){
          console.log("Adding transaction");
          console.log(data[transactions[i]]);
          ob.setState({
            transaction: data[transactions[i]],
            users: null,
            items: null
          });
          break;
          //console.log(data[id]);
          //console.log(i +" is the one.");
        } else {
          ob.setState({
            transaction: null
          });
        }
      }
    }).catch(function(error) {
  console.log(error);
});
    const accRootref = firebase.database().ref('Accounts');
    accRootref.once('value').then(function(snap) {
      var data = snap.val();
      var accounts = Object.keys(data);
      //console.log(accounts);
      //console.log(accounts.length);
      //accountOwner = accounts[0].Address;
      for(var i = 0; i < accounts.length+1; i++) {
        if(accounts[i] == id){
          console.log(data[accounts[i]]);
          console.log(id);
          //console.log("THIS" + toString(accounts[i].Address).toUpperCase());
        //  console.log("its a person");
      //    console.log(accounts[i] + " : " + id);
        //  console.log(accounts[i]);
          ob.setState({
            users: data[accounts[i]],
            transaction: null,
            items: null
          })
          console.log(i +" is the one.");
          break;
        } else {
          console.log("Your going null bitch");
          ob.setState({
            users: null
          });
        }
      }
    }).catch(function(error) {
  console.log(error);
});
    const itemRootref = firebase.database().ref('Items');
    itemRootref.once('value').then(function(snap) {
      var data = snap.val();
      var items = Object.keys(data);
      console.log(items);
      console.log(items.length);
      //accountOwner = accounts[0].Address;
      for(var i = 0; i < items.length+1; i++) {
        if(items[i]== id){
          console.log("it's an item")
          console.log(data[items[i]]);
          ob.setState({
            items: data[items[i]],
            transactions: null,
            users: null
          })
          console.log(data[items[i]]);
          console.log(i +" is the item.");
          break;
        } else {

        }
      }
    }).catch(function(error) {
  console.log(error);
});


  }

  render() {

    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    var web3 = new Web3(provider);
    return(
      <div className="Scan">
      <form className="Scan-Form" id="UIDForm" onSubmit={this.handleSubmit}>
        <input form="UIDForm" type="text" className="Scan-Searchbar"  placeholder="Enter UID" ref={(input) => {this.UID = input;}}  />
        <img className="Marketplace-Searchbar-Icon" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAANlBMVEX///+/v7/8/Pz19fXCwsLKysrFxcX4+PjMzMzQ0NDk5OTc3Nzf39/Hx8fW1tbR0dHw8PDq6uqixblZAAADbklEQVRogd2a6bLqIAyALdBC2Urf/2WvdTnjyQIBqzPn5rf4mRWSeLnUxBYf1nkx0zSZZd6CL7b6+W5R2uf5+PpXMXP2Wp2FsH5bJlqWbT9FHx0SQ7jLHPWnEYek+JY2yrcRN238uG/KKkJcxWyDNlOeczdpsyFlbIYx21Am9FP01oU4JPf6X7tuxjStfY4ZYnRSBhnTtMktZvv98ZQs9b4Kw4xpikKIZ2M3uRxiDCE7NoXMLmIUppTMYf+p7ErvXFGbJc5XpEPMimq69SupssQtnjroduqk8vOYwTRxzgQuMm0glHHNOCYiK1V+GllFfUsR7M65VE/sxImGKrGXQUZjXRWLPJJajKsuyGJrNcBQaIlyC2Vv9RTOkSBgXFSGx3Ll0xoq3o7G+zlo5ZrrobWEhajvIFS77sAXsfAC4s2MYkuqCFaF/3kFREkrqV4EJnFiazH8OaLQegiwtGHTC9YtubXwD2STHmQJrzIh0NSsFYDfxbF1CAwaNh0X4ecoUeBxvnEflGpMCvA8awbgO+nr5i4gatz/D/mKT96KLpBkGwd5J0+UNE9AqHdlPLzvWFvDItdTu/bfZ/na9ZUqDIuc8IY/BN4nC2tqWOQ67CW/GdHTho1DdBLOLiqWPu21UrvvoFOkqYIeK6niTaS1rH7hTrZaLJDai8Rge9dbmGhPmp0D1Ts0Yh83Wq5VXApuAButVsHdWYNCMJpFD3UBDYsR3Vw7WqhRwRK5SB7sfomu8SprIfv4nZwmCcIeJdZNTEbjArVv9BBGMvVCUf/AuFjsz2zFluDYOU8zIC+MwW6ceQvRex/zmqpTUAGFHuF0iWun8PB0sItCJFivDJWjj1De10UwMCnv+0VAGZijI0r7MlJUXTqfQpemkynXIitboSQ2GEXXdxFsUZagNbszElFUyXVtUjiCqEJpjT3voiNbcM36XADyFCOjXNUJKzK7SVt8ucvep9ym89cK79JySHJr8DvYyfILETnlRlJWH2IVdRvXKKftiGsU9ikyQCEeVH+VgkfEP5SBZWc/Zfp7FH659xVKX1aOUkSrOzGFq6h9M7QGJTIUdyKEpZgzISzlVAhDOVeTYwVJUNLJEHId3jXXHKTws7YTKeI/HvRRfr2nJM3kiLyuUwUty6CU518DTP6QHoeo4z9oJj0GAf8AJ64kOMYO0KsAAAAASUVORK5CYII="} />
      </form>
              {
                def.map((obj, i) => {
                  if(this.state.transaction != null && searched) {
                  return(
                    <div className="Scan-post" key={i}>
                    <p className="Scan-Title">Transactions</p>
                        <div className="Scan-post-text">
                          <p className="Scan-post-text-to">{"Transaction ID: " + this.state.transaction.blockHash}</p>
                          <p className="Scan-post-text-to">{"From: " + this.state.transaction.from}</p>
                          <p className="Scan-post-text-to">{"To: " + this.state.transaction.to}</p>
                          <p className="Scan-post-text-to">{"Value: " + this.state.transaction.value}</p>
                        </div>
                    </div>
                  )
                } else if(this.state.users != null && searched) {
                  return(
                    <div className="Scan-post" key={i}>
                    <p className="Scan-Title">Users</p>
                        <div className="Scan-post-text">
                          <img className="User-post-img" src={this.state.users.Image}/>
                          <p className="Scan-post-text-id">{"Name: " + this.state.users.LastName + ", " + this.state.users.FirstName}</p>
                          <p className="Scan-post-text-id">{"Balance: " + this.state.users.Balance + " ETH" }</p>
                          <p className="Scan-post-text-id">{"Address: " + this.state.users.Address }</p>
                        </div>
                    </div>
                  )
                } else if(this.state.items != null && searched) {
                  if(this.state.items.Warranty == null) {
                    return (
                      <div className="Scan-post" key={i}>
                      <p className="Scan-Title">Items</p>
                          <div className="Scan-post-text">
                            <img className="User-post-img" src={this.state.items.ImageSource}/>
                            <p className="Scan-post-text-id">{"Name: " + this.state.items.Name }</p>
                            <p className="Scan-post-text-id">{"Description: " + this.state.items.Description }</p>
                            <p className="Scan-post-text-id">{"Owner: " + this.state.items.OwnerAddress }</p>

                          </div>
                      </div>
                    )
                  } else {
                  return (
                    <div className="Scan-post" key={i}>
                    <p className="Scan-Title">Items</p>
                        <div className="Scan-post-text">
                          <img className="User-post-img" src={this.state.items.ImageSource}/>
                          <p className="Scan-post-text-id">{"Name: " + this.state.items.Name }</p>
                          <p className="Scan-post-text-id">{"Description: " + this.state.items.Description }</p>
                          <p className="Scan-post-text-id">{"Owner: " + this.state.items.OwnerAddress }</p>
                          <p className="Scan-Title">Warranty Information</p>
                          <div className='warranty-box'>
                          <p className="Scan-post-text-id">{"Warranty: " + this.state.items.Warranty.warrantyId }</p>
                          <p className="Scan-post-text-id">{"Warrantor: " + this.state.items.Warranty.warrantor }</p>
                          <p className="Scan-post-text-id">{"Coverage: " + this.state.items.Warranty.coverage }</p>
                          <p className="Scan-post-text-id">{"Date Issued: " + this.state.items.Warranty.dateIssued }</p>
                          <p className="Scan-post-text-id3">{"Valid To: " + this.state.items.Warranty.validTo }</p>
                          </div>

                        </div>
                    </div>
                  )
                }
                } else {
                  return (
                  <div className="Scan-post" key={i}>
                  <p className="Scan-Title">Please search again!</p>
                      <div className="Scan-post-text">
                        <p className="Scan-post-text-id"></p>
                      </div>
                  </div>
                )
                }
                })
              }
      </div>
    )
  }

}

export default Scan;
