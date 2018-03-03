pragma solidity ^0.4.11;

contract Transaction{
    address poster;
    mapping (address => uint256) public balances;

    event LogDeposit(address sender, uint amount);
    event LogWithdrawal(address receiver, uint amount);
    event LogTransfer(address sender, address to, uint amount);
    
    function deposit() payable returns(bool success) {
        balances[poster] +=msg.value;
        LogDeposit(poster, msg.value);
        return true;
    }

    function withdraw(uint value) returns(bool success) {
        if(balances[msg.sender] < value) throw;
        balances[msg.sender] -= value;
        msg.sender.transfer(value);
        LogWithdrawal(msg.sender, value);
        return true;
    }

    function transfer(address to, uint value) returns(bool success) {
        if(balances[msg.sender] < value) throw;
        balances[msg.sender] -= value;
        to.transfer(value);
        LogTransfer(msg.sender, to, value);
        return true;
    }
}
