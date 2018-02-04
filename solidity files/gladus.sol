pragma solidity ^0.4.16;


contract gladusToken {
    
    //address of owner
    address owner = msg.sender;
    //Constant variable for token Name
    string constant tokenName = "Gladus";
    //Constant variable for token symbol
    string constant symbol = "gls";
    //maximum decimal places for the token
    uint8 constant decimals = 18;
    //maximum available tokens in cricualtion
    //uint256 totalAvailableTokens;
    uint256 constant initialTokens = 300000;
    
    //mapping addresses to uint256 to store balance  
    mapping(address => uint256) balance;
    
    //variable to storw totalTransactionValue
    uint256 totalTransactionValue;
    
    //notify everyone about about the tranfer
    event Transfer(address sender, address reciever, uint256 value);
    
    function gladusToken() {
        balance[msg.sender] = initialTokens;
    }
    
    
    function sendGladus(address to_address, uint256 value) {
        
        //require to make sure balance is greater then value
        require(balance[msg.sender] >= value && (balance[to_address] + value > balance[to_address]));
        
        //sender's address should not be 0x0
        require(to_address != 0x0);
        
        balance[msg.sender] -= value;
        balance[to_address] += value;
        
        totalTransactionValue += value;
        
        //notify everyone about about the tranfer
        Transfer(msg.sender, to_address, value);
    }
    
    //function to get all balannce of all addresses
    function getBalance(address balance_of) view public returns(uint256 bal) {
        return balance[balance_of];
    }
    
    //function to get total value of tokens sent and reieved till date
    function getDetails() view public returns(uint256 myNumber){
        return totalTransactionValue;
    }
    
    function getGeneralDetails() view public returns(string,string,uint256) {
        return (tokenName, symbol, initialTokens);
    }
    
}