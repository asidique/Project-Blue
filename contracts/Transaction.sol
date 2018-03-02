pragma solidity ^0.4.17;


contract Coin {
    // The keyword "public" makes those variables
    // readable from outside.
    address public minter;
    mapping (address => uint) public balances;

    // Events allow light clients to react on
    // changes efficiently.
    event Sent(address from, address to, uint amount);

    // This is the constructor whose code is
    // run only when the contract is created.
    function Coin() {
        minter = msg.sender;
    }
    function mint(address receiver, uint amount) {
        if (msg.sender != minter) return;
        balances[receiver] += amount;
    }
    function send(address receiver, uint amount) public returns(bool successful) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Sent(msg.sender, receiver, amount);
        return true;
    }
}

contract Transaction {
  address[100] public purchaser;

  function buy(uint itemId) public returns (uint) {
    require(itemId >= 0 && itemId <= 99);
    purchaser[itemId] = msg.sender;
    Coin c = Coin(msg.sender);
    c.send(test, 2);
    return itemId;
  }

  function getPurchasers() public view returns (address[100]) {
    return purchaser;
  }

}
