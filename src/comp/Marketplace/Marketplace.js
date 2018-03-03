import React, { Component } from 'react';
import TransactionContract from '../../../build/contracts/Transaction.json'
import getWeb3 from '../../utils/getWeb3'
import Web3 from 'web3'
import './Marketplace.css'
import $ from 'jquery';
import * as firebase from 'firebase';

var BigNumber = require('bignumber.js');

function GenerateMarketplace(props) {
  var data = Object.values(props.item);
  var list = Object.keys(Object.keys(props.item));
  console.log(data);
  return(
    <div>
      {
        list.map((index, i) => {
          return(
            <GenerateMarketplaceItems title={data[index].Name} desc={data[index].Description} img={data[index].ImageSource} index={index} key={i} />
          )
        })
      }
    </div>
  )

}

function GenerateMarketplaceItems(props) {

  return(
    <div>
    <Media>
    <Media.Left align="middle">
      <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
    </Media.Left>
    <Media.Body>
      <Media.Heading>Middle aligned media</Media.Heading>
      <p>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
        fringilla. Donec lacinia congue felis in faucibus.
      </p>

      <p>
        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
        leo. Cum sociis natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      </p>
    </Media.Body>
  </Media>
      <div className="Market-post">
          <img className="Market-post-img" src={props.img}/>
          <div className="Market-post-text">
              <p className="Market-post-text-title">{props.title}</p>
              <p className="">{props.desc}</p>
              <button className="Market-post-buy" onClick={(e) => this.instantiateContract(5)} >Buy</button>
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
      posts: []
    };


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
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

     //var data = JSON.parse('Transaction.json');
     //console.log(data);

     $.getJSON('Transaction.json', function(data) {
       var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
       var web3 = new Web3(provider);
       const contract = require('truffle-contract');
       var transaction;
       // Get the necessary contract artifact file and instantiate it with truffle-contract
       var TransactionArtifact = data;
       //App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      transaction = contract(TransactionArtifact);
      transaction.setProvider(provider);
      //web3.eth.defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
         web3.eth.getAccounts((error, accounts) => {
        //  web3.eth.defaultAccount = accounts[0];
           transaction.deployed().then((instance) => {
             var transactionInstance = instance;
             transactionInstance.LogDeposit().watch(function(err, result) {
               //console.log(result);
             });
            //transactionInstance.deposit({from:accounts[1],value:web3.toWei(2,"ether")});
            //return transactionInstance.transfer(accounts[2],web3.toWei(2,"ether"),{from:accounts[1]});
            var a = transactionInstance.deposit.sendTransaction({from:accounts[2],value:web3.toWei(1,"ether")});
            var b = transactionInstance.transfer.sendTransaction(accounts[3],web3.toWei(1,"ether"),{from:accounts[2]});
            a.then(function(i){
                //transactionID
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
            </div>
          </div>
          <div className="Market">
            <GenerateMarketplace item={this.state.posts} />
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Marketplace;
