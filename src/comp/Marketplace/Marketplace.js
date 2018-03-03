import React, { Component } from 'react';
import TransactionContract from '../../../build/contracts/Transaction.json'
import getWeb3 from '../../utils/getWeb3'
import Web3 from 'web3'
import './Marketplace.css'
import $ from 'jquery';
import * as firebase from 'firebase';
import Search from '../Search/Search'

var BigNumber = require('bignumber.js');

function GenerateMarketplace(props) {
  var data = Object.values(props.item);
  var list = Object.keys(Object.keys(props.item));
  return(
    <div>
      {
        list.map((index, i) => {
          if(String(props.filter).length == 0) {
            return(
              <GenerateMarketplaceItems contract={props.contract} cost={data[index].Cost} title={data[index].Name} desc={data[index].Description} img={data[index].ImageSource} index={index} key={i} />
            )
          } else if(String(data[index].Name).toUpperCase().includes(String(props.filter).toUpperCase()))
          return(
            <GenerateMarketplaceItems contract={props.contract} cost={data[index].Cost} title={data[index].Name} desc={data[index].Description} img={data[index].ImageSource} index={index} key={i} />
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
            <button className="Market-post-buy" onClick={(e) => props.contract(5)} >Buy</button>
            <button className="Market-post-contact">Contact</button>
          </div>
      </div>
    </div>
  )
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
  }

  componentDidMount() {
    var firebase = require('firebase');
    var config = {
      apiKey: "AIzaSyDG9CDTPG9Xy9RcxcG-8EszO1Wughk0WLg",
      authDomain: "project-blue-bad22.firebaseapp.com",
      databaseURL: "https://project-blue-bad22.firebaseio.com",
      projectId: "project-blue-bad22",
      storageBucket: "project-blue-bad22.appspot.com",
      messagingSenderId: "493800653303"
    };
    firebase.initializeApp(config);
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    const rootref = firebase.database().ref('Posts');
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

  instantiateContract(itemId) {
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
             transactionInstance.LogDeposit().watch(function(err, result) {
             });
            var a = transactionInstance.deposit.sendTransaction({from:accounts[2],value:web3.toWei(1,"ether")});
            var b = transactionInstance.transfer.sendTransaction(accounts[3],web3.toWei(1,"ether"),{from:accounts[2]});
            a.then(function(i){
                console.log(i);
                var transactionReceipt = web3.eth.getTransaction(i);
                console.log(transactionReceipt);
                 const n = new BigNumber(transactionReceipt.value);
                 var v = web3.fromWei(n, 'ether').toString();
                 //v = value of the transaction (number of ether transfered)
                 console.log(v);
              });
           })
         });
     });

  }

  handleFilter(a) {
    this.setState({
      searchFilter: a
    }, () => {});
    console.log(this.state.searchFilter);
  }



  render() {

    return (
      <div className='Marketplace'>
          <div className="Account-Balance">
            14 eth
          </div>
        {
        <div className="Marketplace-Page">
          <div className="Marketplace-Page-Container">
            <p className="Marketplace-Title">MARKET PLACE</p>
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
