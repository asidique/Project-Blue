import React, { Component } from 'react';
import TransactionContract from '../../../build/contracts/Transaction.json'
import getWeb3 from '../../utils/getWeb3'
import Web3 from 'web3'
import './Marketplace.css'
import $ from 'jquery';

class Marketplace extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })

    }).then(() => {
      console.log(this.state.web3);
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
     console.log("IM WORKING");

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
      console.log(transaction);
         web3.eth.getAccounts((error, accounts) => {
        //   console.log(web3.eth.getTransactionReceipt)
          // web3.eth.defaultAccount = accounts[0];
           transaction.deployed().then((instance) => {
             var transactionInstance = instance;
              transactionInstance.deposit({from:accounts[5],value:web3.toWei(5,"ether")});
            return transactionInstance.transfer(accounts[0],web3.toWei(4,"ether"),{from:accounts[5]});
          //   var transactionAddress = transactionInstance.addressHash;
          //   console.log(transactionAddress);
              //  return transactionInstance.withdraw(web3.toWei(3,"ether"),{from:web3.eth.accounts[0]});
           })
         });
     });







    /*const transaction = contract(TransactionContract)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var transactionInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      transaction.deployed().then((instance) => {
        transactionInstance = instance

        // Stores a given value, 5 by default.
        return transactionInstance.buy(itemId, {from: accounts[0]})
      })
    })*/
  }

  render() {
    return (
      <div className='Marketplace'>
          <div className="Account-Balance">
            14 eth
          </div>

        {/* INSERT MARKPLACE FRONT END CODE HERE. DELETE THIS LINE*/
            /*
                <form action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search">
                        <button type="submit"><i class="fa fa-search"></i></button>
                </form>*/
        <div className="Marketplace-Page">
            <div className="Marketplace-Page-Container">
            <p className="Marketplace-Title">MARKET PLACE</p>
            <div className="Search-Container">
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit">Magnifying glass Icon/add it in the search bar</button>
            </div>
            </div>
            <div className="Market">
                <ul>
                    <div className="Market-Object">
                        <img className="Object-Image" src="Images/qr_sample.png"/>
                        <div className="Object-Info">
                            <p className="Title-Field">Title</p>
                            <p className="Seller-Field">Seller</p>
                            <button className="Buy-Button" onClick={(e) => this.instantiateContract(5)} >Buy</button><button className="Contact-Button">Contact</button>
                        </div>
                    </div>
                    <div className="Market-Object">
                        <img className="Object-Image" src="Images/qr_sample.png"/>
                        <div className="Object-Info">
                            <p className="Title-Field">Title</p>
                            <p className="Seller-Field">Seller</p>
                            <button className="Buy-Button">Buy</button><button className="Contact-Button">Contact</button>
                        </div>
                    </div>
                </ul>

            </div>
        </div>
        }
      </div>
    )
  }
}

export default Marketplace;
