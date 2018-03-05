# BlueChain - An ethereum based marketplace

![alt text](https://github.com/asidique/Project-Blue/blob/master/public/Images/logo.png)

BlueChain utilizes a blockchain to verify transactions through smart contracts. In addition to this, warranty on products can be sold and executed as a smart contract for items you might sell.
Transactions are instantly executed. Loyalty points are also given to users who utilize this marketplace to incentivise its use.


## Overview of Website

The website features 4 different tabs which show 4 different features of BlueChain interacting with the ethereum blockchain behind the scenes.

### Marketplace

The Marketplace is a realtime update listing of items that are currently for sale. Uses a search bar to find all related posts. If a new post is created, it will 
be updated to the market. It uses the firebase database to store, retrieve and write information. Clicking on a 'buy' item will process a
transaction and your balance shown on the right will reduce according to the purchase. This 'buy' initiates a smart contract on the blockchain and
in turn, updates the database which will update the front-end. The loyalty points are a feature that gives users an incentive for making purchases on the marketplace.
A fraction of the cost is returned to them via loyalty points. This is an instant transaction.

![alt text](https://github.com/asidique/Project-Blue/blob/master/public/Images/logo.png)

### Post Ad

This function gives users the ability to post an ad onto the market place. Name, Description, Price and images are required to post and once posted,
will dynamically generate a smart contract call when some buyer buys from the marketplace. Images can be local or an image online. NOTE: Once
an ad is posted, you cannot buy your own ad on the marketplace. Notice how when we post an add, the cancel button replaces the buy button on the marketplace.

### Profile

This profile overview access a database of users that all have an address, balance and loyalty points. It also contains a history of transaction for the user
to see all of the things that they may have bought or sold.

### Scan

This is a feature where the user can interacte with the blockchain by searching for Users, Transactions and Items. When the search bar input is submitted,
we retrieve information from the database, parse it and return it to the user.

## Technologies Used
<img src="https://eternitech.com/wp-content/uploads/2016/12/ReactJS.png" alt="Drawing" style="width: 100;"/>
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_500/v1513013358424/BJ8dgr3Zf.png" alt="Drawing" style="width: 100;"/>
<img src="https://alphabaymarket.com/wp-content/uploads/2017/05/Etherium1.jpg" alt="Drawing" style="width: 100;"/>
<img src="https://i2.wp.com/ionicacademy.com/wp-content/uploads/2017/06/firebase-circle.png?ssl=1" alt="Drawing" style="width: 100;"/>
