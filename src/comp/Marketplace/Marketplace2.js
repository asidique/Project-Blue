import React, { Component } from 'react';
import TransactionContract from '../../../build/contracts/Transaction.json'
import getWeb3 from '../../utils/getWeb3'
import Web3 from 'web3'
import './Marketplace.css'
import $ from 'jquery';
import Search from '../Search/Search'
import firebase from '../firebase'
import Balance from '../Balance/Balance'

var BigNumber = require('bignumber.js');
var accountOwner;
var bal, points;

window.onload = () => {
  initData();
}

function initData() {
    const rootref = firebase.database().ref('Accounts');
    rootref.once('value').then(function(snap) {
      var data = snap.val();
      var accounts = Object.values(data);
      accountOwner = accounts[0].Address;

      for(var i = 1; i < 6; i++) {
        var acc = Math.floor(Math.random() * Math.floor(10));

        writePostData((accounts[acc].Address), i);
        writeItemData((accounts[acc].Address), i);
      }
      for(var j = 0; j<accounts.length; j++){
        writeAccountData(accounts[j].Address,accounts[j],j);
      }
    });

}

function GenerateMarketplace(props) {
  var data = Object.values(props.item);
  var list = Object.keys(Object.keys(props.item));

  return(
    <div>
      {
        list.map((index, i) => {
          if(String(props.filter).length == 0) {
            return(
              <GenerateMarketplaceItems owner={data[index].OwnerAddress} uid={data[index].UID} contract={props.contract} cost={data[index].Cost} title={data[index].Name} desc={data[index].Description} img={data[index].ImageSource} index={index} key={i} />
            )
          } else if(String(data[index].Name).toUpperCase().includes(String(props.filter).toUpperCase()))
          return(
            <GenerateMarketplaceItems owner={data[index].OwnerAddress} uid={data[index].UID} contract={props.contract} cost={data[index].Cost} title={data[index].Name} desc={data[index].Description} img={data[index].ImageSource} index={index} key={i} />
          )
        })
      }
    </div>
  )

}

function GenerateMarketplaceItems(props) {

  return(
    <div>
      <div className="Market-post">
          <img className="Market-post-img" src={props.img}/>
          <div className="Market-post-text">
              <p className="Market-post-text-title">{props.title}</p>
              <p className="">{props.desc}</p>
          </div>
          <div className="Market-post-btn">
            <p className="Market-post-cost">{props.cost + ' ETH'}</p>
            <button className="Market-post-buy" onClick={(e) => props.contract(props.uid, props.cost, accountOwner, props.owner)} >Buy</button>
            <button className="Market-post-contact">Contact</button>
          </div>
      </div>
    </div>
  )
}

function writeUserData(address, id, imageUrl, fname, lname, balance) {
  firebase.database().ref('Accounts/' + id).set({
    Address: address,
    ID: id,
    Image : imageUrl,
    FirstName : fname,
    LastName : lname,
    Balance: balance
  });
}

function writePostData(id, name, description, imageURL, cost, uid, owner) {
  firebase.database().ref('Posts/' + id).set({
    Name: name,
    UID: uid,
    ImageSource : imageURL,
    Description : description,
    OwnerAddress : owner,
    Cost: cost
  });
}

function writePostData(owner, id) {
  firebase.database().ref('Posts/' + id+'/OwnerAddress').update(owner);
}

function writeItemData(owner,id){
  firebase.database().ref('Items/' + id+'/OwnerAddress').update(owner);
}
function writeAccountData(owner,account,id){
  firebase.database().ref('Accounts/' + owner).set(account);
}



class Marketplace extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      web3: null,
      posts: [],
      searchFilter: ""
    };


    this.handleFilter = this.handleFilter.bind(this);
    this.instantiateContract = this.instantiateContract.bind(this);

    const rootref1 = firebase.database().ref('Accounts');
    rootref1.once('value').then(function(snap) {
      var data = snap.val();
      var accounts = Object.values(data);
      accountOwner = accounts[0].Address;
      firebase.database().ref('Posts').once('value').then(function(snap2) {
        var length = Object.keys(snap2.val()).length;
        console.log(length);
        for(var i = 1; i <= length; i++) {
          var acc = Math.floor(Math.random() * Math.floor(10));
          writePostData((accounts[acc].Address), i);
        }
      });

    });


  }

  componentDidMount() {

    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    var web3 = new Web3(provider);
    //FAKE NAMES
    var fnames = ["Theresa", "Joe", "Karen", "Caroline", "Angela", "John", "Amelia", "Sally", "Sean", "Elizabeth"];
    var lnames = ["Sutherland", "Gray", "Ball", "Buckland", "Clark", "Langdon", "Duncan", "Lawrence", "Paige", "MacDonald"];
    var images = ["http://rs38.pbsrc.com/albums/e106/laydii_random/thankyou/Capture34-1-1.jpg?w=280&h=210&fit=crop",
                  "http://rs710.pbsrc.com/albums/ww110/CENTURYON/MIAVATAR-ancho100pixelsalto100pixelstamao600KiBgif-1.jpg?w=280&h=210&fit=crop",
                  "http://rs778.pbsrc.com/albums/yy67/dwilson1313/Shifter%20Academy/hyena3.jpg?w=280&h=210&fit=crop",
                  "http://rs38.pbsrc.com/albums/e106/laydii_random/thankyou/Capture28-1-1.jpg?w=280&h=210&fit=crop",
                  "http://rs38.pbsrc.com/albums/e106/laydii_random/thankyou/Capture51-1-1.jpg?w=280&h=210&fit=crop",
                  "http://rs1211.pbsrc.com/albums/cc437/PhoenixC_Photos/Kingsley/day_break_taye_diggs-003-1.jpg?w=280&h=210&fit=crop",
                  "http://rs38.pbsrc.com/albums/e106/laydii_random/thankyou/1-2.jpg?w=280&h=210&fit=crop",
                  "http://rs988.pbsrc.com/albums/af4/RobertaSmith255/Avatar/100x100.jpg?w=280&h=210&fit=crop",
                  "http://rs1127.pbsrc.com/albums/l628/ruiazevedo69/RuiAzevedo-foto-100x100.jpg?w=280&h=210&fit=crop",
                  "http://rs381.pbsrc.com/albums/oo257/SSelenagomezz/Icons/Image117E3.jpg?w=280&h=210&fit=crop"];

    web3.eth.getAccounts((error, accounts) => {
      //for(var i = 0; i < accounts.length; i++) {
      //  writeUserData(accounts[i], i, images[i], fnames[i], lnames[i], web3.fromWei(new BigNumber(web3.eth.getBalance(accounts[i])), "ether").toFixed(5));
      //}
    });


    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    const rootref = firebase.database().ref('Posts/');
    rootref.on('value', snap => {
      this.setState({
        posts: snap.val()
      })
    })

    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })

    }).then(() => {
      //console.log(this.state.web3);
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(itemId, itemCost, buyer, seller) {
    if(go) {
     $.getJSON('Transaction.json', function(data) {
       var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
       var web3 = new Web3(provider);
       const contract = require('truffle-contract');
       var transaction;
       var TransactionArtifact = data;
      transaction = contract(TransactionArtifact);
      transaction.setProvider(provider);
         web3.eth.getAccounts((error, accounts) => {
           transaction.deployed().then((instance) => {
             var transactionInstance = instance; 
            var a = transactionInstance.deposit.sendTransaction({from: buyer, value:web3.toWei(itemCost,"ether")});
            var b = transactionInstance.transfer.sendTransaction(seller, web3.toWei(itemCost,"ether"),{from:buyer});
            //const rootref = firebase.database().ref('Posts/' + itemId).remove();
              a.then(function(i){
                var transactionReceipt = web3.eth.getTransaction(i);
                console.log(transactionReceipt.transactionHash);
                 const n = new BigNumber(transactionReceipt.value);
                 var v = web3.fromWei(n, 'ether').toString();
                 transactionReceipt.value = v;
                 transactionReceipt.to = seller;
                 var postId=itemId;
                 //v = value of the transaction (number of ether transfered)
              firebase.database().ref('Transactions/' + transactionReceipt.blockHash).set(transactionReceipt);
              firebase.database().ref('Accounts/' + buyer +"/transactions/"+transactionReceipt.blockHash).set(transactionReceipt);
              firebase.database().ref('Accounts/' + seller +"/transactions/"+transactionReceipt.blockHash).set(transactionReceipt);
              firebase.database().ref('Items/' + itemId +"/owner").set(buyer);
              firebase.database().ref('Items/' + itemId +"/history/"+transactionReceipt.blockHash).set(transactionReceipt);
              firebase.database().ref('Posts/'+postId).remove();
              console.log("Transaction Cost: " + v);
              }).catch(function(err){
              console.log("err occured in a: "+err);
                return;
            });
            b.then(function(i){
                var transactionReceipt = web3.eth.getTransaction(i);
                console.log(transactionReceipt);
                 const n = new BigNumber(transactionReceipt.value);
                 var v = web3.fromWei(n, 'ether').toString();
                 transactionReceipt.value = itemCost;
                 //v = value of the transaction (number of ether transfered)
                 console.log("Transaction Cost: " + itemCost);
              }).catch(function(err){
              console.log("err occured in b: "+err);
            return;
  });
});
         });
     });
}
  }

  handleFilter(a) {
    this.setState({
      searchFilter: a
    }, () => {});

  }



  render() {

    return (
      <div className='Marketplace'>
          <div className="Account-Balance">
            <Balance />
          </div>
        {
        <div className="Marketplace-Page">
          <div className="Marketplace-Page-Container">
            <p className="Marketplace-Title">Market Place</p>
            <div className="Search-Container">
              <Search addFilter={this.handleFilter} />
            </div>
          </div>
          <div className="Market">
            <GenerateMarketplace contract={this.instantiateContract} item={this.state.posts} filter={this.state.searchFilter}  />
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Marketplace;
